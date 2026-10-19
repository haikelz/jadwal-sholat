# Docker Coding-Agent Guideline

Precedence follows `general.md` §2. This document covers Dockerfiles, build
contexts, Compose files, and container deployment for the owner's services.

The terms **MUST**, **SHOULD**, and **AVOID** are normative. Existing weak
practices are not precedent: preserve required compatibility while correcting
unsafe patterns within the task's scope.

## 1. Discovery and Scope

Before editing, the agent **MUST**:

1. Read Dockerfiles, `.dockerignore`, Compose files, CI workflows, lockfiles,
   runtime version files, and the application's health and shutdown code. Never
   open populated secret files to inspect configuration.
2. Identify every build context, target stage, platform, registry, and deploy
   target affected, and determine the real build output, runtime command,
   writable paths, port, and probe semantics from code rather than assumptions.
3. Prefer one process role and one lifecycle per image: web process, worker,
   migration job, or static binary.
4. Make the smallest complete change. Do not rewrite unrelated container files or
   silently change deployment contracts such as user, port, entry point, image
   name, or health endpoint. Report compatibility assumptions and checks that
   could not run.

## 2. Image Principles

- An image **MUST** be reproducible from reviewed source, a lockfile, pinned
  inputs, and a declared build command. Mutable state belongs outside the image.
- The image built for a commit **MUST** be the artifact deployed for that commit.
  Do not rebuild the same revision separately per environment.
- Runtime images **MUST** contain only the executable application, production
  dependencies, certificates, time-zone data when needed, and declared assets.
  Build tools, tests, caches, and development dependencies stay in earlier
  stages.
- Layers **MUST NOT** contain secrets, private package credentials, local
  configuration, VCS history, or secret material deleted in a later layer.
- Images **MUST NOT** download code, packages, or plugins at startup.

## 3. Pinning

- `FROM` images **MUST** use a supported version tag and **SHOULD** add a digest:
  `FROM oven/bun:<BUN_VERSION>-alpine@sha256:<DIGEST>`. Floating tags such as
  `latest`, `alpine`, or a bare major (`bun:1`) **MUST NOT** be the only identity.
- Language dependencies **MUST** install from the repository lockfile in frozen
  mode with the package manager version the repository pins.
- Operating-system packages **MUST** be explicit and installed in one layer with
  caches removed or owned by a BuildKit cache mount. Do not install tools that
  nothing in the image calls.
- Downloaded tools **MUST** have a pinned version and a verified checksum or
  signature. Never pipe an unverified remote script into a shell.
- Toolchain helpers **MUST** be pinned too. Node 25 and later no longer ship
  Corepack, so install the exact package-manager version
  (`npm install --global pnpm@<PNPM_VERSION>`). On Node 24 and earlier, Corepack
  MAY activate the `packageManager` version from `package.json`.

## 4. Dockerfile Structure

- Start every Dockerfile with `# syntax=docker/dockerfile:1`.
- Order instructions for correctness and caching: dependency manifests,
  dependency installation, source, build, then a minimal runtime stage.
- Name stages in lowercase (`deps`, `build`, `runtime`) and reference them by
  name in `COPY --from`.
- `WORKDIR` **MUST** be absolute. `COPY` sources **SHOULD** be narrow; `COPY . .`
  is acceptable in a build stage only after `.dockerignore` proves the context
  narrow.
- Use exec form for runtime `ENTRYPOINT` and `CMD`.
- `ARG` and `ENV` **MUST NOT** carry secrets; both are visible in image history
  and build logs. Runtime configuration **MUST NOT** be baked into the image.
- Copy runtime files with final ownership. Avoid a later recursive `chown`
  layer.

Generic pnpm pattern:

```dockerfile
# syntax=docker/dockerfile:1
ARG NODE_IMAGE=node:<NODE_VERSION>-slim@sha256:<NODE_IMAGE_DIGEST>

FROM ${NODE_IMAGE} AS deps
WORKDIR /app
RUN npm install --global pnpm@<PNPM_VERSION> && \
    pnpm config set store-dir /pnpm/store
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

FROM deps AS build
COPY . .
RUN pnpm run build && pnpm prune --prod

FROM ${NODE_IMAGE} AS runtime
ENV NODE_ENV=production
WORKDIR /app
RUN groupadd --system --gid 10001 app && \
    useradd --system --uid 10001 --gid app --home-dir /nonexistent app
COPY --from=build --chown=10001:10001 /app/dist ./dist
COPY --from=build --chown=10001:10001 /app/node_modules ./node_modules
COPY --from=build --chown=10001:10001 /app/package.json ./package.json
USER 10001:10001
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

Replace placeholders with reviewed values and adapt account commands to the
base image.

## 5. BuildKit Caches and Secrets

- Use BuildKit cache mounts for package downloads and compiler caches, not for
  final dependency trees. Include the platform in cache IDs when cross-builds can
  collide.
- Build-time secrets such as registry tokens or CMS tokens **MUST** use
  `RUN --mount=type=secret`, read only by the single instruction that needs them,
  and never echoed or copied into a layer. Never pass them as `ARG`.
- Private Git access **MUST** use `RUN --mount=type=ssh` with host-key
  verification.

```dockerfile
RUN --mount=type=secret,id=cms_token,env=CMS_TOKEN \
    bun run build
```

## 6. Build Context and `.dockerignore`

- Every build context **MUST** have a `.dockerignore` at the context root. A
  missing file means `COPY . .` sends the local `.env` into the builder.
- The context **MUST** exclude `.git`, `.env` and `.env.*` (keep `.env.example`
  only if the build reads it), credentials, private keys, editor state, logs,
  coverage, caches, local databases, `node_modules`, and build output the image
  rebuilds.
- Verify that required manifests, lockfiles, source, migrations, and public
  assets stay included after exception rules and nested workspaces.

## 7. Node.js, pnpm, and Bun

- The runtime and package-manager versions **MUST** match across local
  development, CI, and the image.
- Copy every workspace manifest and lockfile before installing so the install
  layer caches independently of source changes. A host `node_modules` **MUST
  NOT** enter the image.
- Production images include only production dependencies or a deploy output.
  Prune after building when build tooling is a development dependency.
- Build native modules for the runtime OS, libc, architecture, and ABI. Never
  copy native artifacts built on another platform.
- Set `NODE_ENV=production` in the runtime stage, not before a build that needs
  development dependencies.

### Bun

- Use a pinned `oven/bun:<BUN_VERSION>-alpine` or `-slim` tag, plus a digest
  when the repository pins digests.
- Install with `bun install --frozen-lockfile` and cache downloads with
  `--mount=type=cache,target=/root/.bun/install/cache`.
- In `oven/bun` images, `node` is a symlink to `bun`, so `CMD ["node",
  "server.js"]` runs under Bun. Use a Node runtime image when the server must run
  on Node.
- Run as the image's non-root `bun` user or an explicit numeric UID.

```dockerfile
# syntax=docker/dockerfile:1
ARG BUN_IMAGE=oven/bun:<BUN_VERSION>-alpine

FROM ${BUN_IMAGE} AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

FROM deps AS build
COPY . .
RUN bun run build
```

## 8. Next.js Standalone Images

- Use `output: "standalone"` when it is compatible with the application.
- The runtime **MUST** copy the standalone tree, `.next/static`, and `public` to
  the paths the standalone server expects. In a monorepo, discover the paths from
  the actual build output.
- `NEXT_PUBLIC_*` values are embedded at build time and **MUST** contain no
  secret. Every build arg a Compose file passes **MUST** have a matching `ARG`
  that the build reads; remove args nothing reads.
- The server **MUST** bind `HOSTNAME=0.0.0.0`, read `PORT`, and run as non-root.
- When the application needs webpack (for example a PWA plugin), build with
  `next build --webpack`; Next.js 16 defaults to Turbopack.

```dockerfile
FROM ${NODE_IMAGE} AS runtime
ENV NODE_ENV=production HOSTNAME=0.0.0.0 PORT=3000
WORKDIR /app
COPY --from=build --chown=10001:10001 /app/.next/standalone ./
COPY --from=build --chown=10001:10001 /app/.next/static ./.next/static
COPY --from=build --chown=10001:10001 /app/public ./public
USER 10001:10001
EXPOSE 3000
CMD ["node", "server.js"]
```

## 9. NestJS and Prisma Images

- Generate the Prisma client before compiling code that imports it.
- Prisma engines **MUST** match the runtime OS, architecture, libc, and OpenSSL.
  Do not swap Alpine and glibc images without proving engine compatibility.
- The runtime **MUST** include the generated client, required engine artifacts,
  compiled output, and production dependencies. Pruning **MUST NOT** remove
  generated Prisma artifacts. Smoke-test the final image by starting it.
- `CMD` **MUST** target the file the compiler actually emits.
- Migrations run as a separate one-shot job (§17), never at application startup.

## 10. Go and Distroless Images

- Build on the build platform and cross-compile for the target:
  `FROM --platform=$BUILDPLATFORM` with `ARG TARGETOS TARGETARCH`.
- Use `CGO_ENABLED=0` only when every dependency supports a static build, and
  `-trimpath` for reproducible paths.
- Run a static binary in a pinned distroless static image or `scratch`. Include
  CA certificates for TLS clients and zone data when the application uses local
  time zones. A CGO binary needs a compatible libc image.
- Distroless images have no shell and no `wget` or `curl`. Never copy an Alpine
  `wget` into distroless; it cannot load its musl libraries. Build a tiny Go
  healthcheck binary from `cmd/healthcheck` and use it as the probe.
- Do not `--chown` the binary to the runtime user; application files stay
  non-writable.

```dockerfile
# syntax=docker/dockerfile:1
FROM --platform=$BUILDPLATFORM golang:<GO_VERSION>@sha256:<DIGEST> AS build
ARG TARGETOS TARGETARCH
WORKDIR /src
COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod go mod download
COPY . .
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH \
    go build -trimpath -o /out/app ./cmd/app && \
    CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH \
    go build -trimpath -o /out/healthcheck ./cmd/healthcheck

FROM gcr.io/distroless/static-debian12:nonroot@sha256:<DIGEST> AS runtime
COPY --from=build /out/app /app
COPY --from=build /out/healthcheck /healthcheck
USER 65532:65532
EXPOSE 8080
ENTRYPOINT ["/app"]
```

```go
package main

import (
	"net/http"
	"os"
	"time"
)

func main() {
	client := http.Client{
		Timeout: 2 * time.Second,
	}

	res, err := client.Get("http://127.0.0.1:" + os.Getenv("APP_PORT") + "/healthz")
	if err != nil || res.StatusCode != http.StatusOK {
		os.Exit(1)
	}
}
```

## 11. Runtime Identity and Filesystem

- The process **MUST** run as a dedicated non-root numeric UID/GID. Set `USER`
  in the image instead of starting as root and dropping privileges in an
  entrypoint; named volumes inherit the ownership of the image directory.
- Production containers **SHOULD** use a read-only root filesystem with explicit
  `tmpfs` or volume mounts for writable paths.
- Drop all capabilities and add back only a documented minimum. Use an
  unprivileged container port. Disable privilege escalation.
- Never mount the Docker socket or run privileged for an ordinary application.

## 12. Process, Signals, and Shutdown

- The application **SHOULD** be PID 1 and **MUST** receive signals directly.
  Shell wrappers **MUST** `exec` the final command.
- The process **MUST** handle `SIGTERM`: stop accepting work, drain bounded work,
  close resources, and exit within the stop grace period.
- Listen on `0.0.0.0` with a configurable, unprivileged port. `EXPOSE` documents
  a port; it neither publishes nor secures it.

## 13. Health Probes

- Liveness answers whether the process can continue and **MUST NOT** fail only
  because a database or optional upstream is down. Readiness answers whether the
  instance can take traffic, with bounded dependency checks.
- Probe endpoints are cheap and expose no secrets or internal errors.
- Keep one probe owner. Under Compose and Dokploy, the Compose `healthcheck` is
  the source of truth; do not also define a Dockerfile `HEALTHCHECK`. Under
  Kubernetes, the pod probes own it.

## 14. Configuration and Secrets

- Images are environment-neutral. Inject configuration at runtime through
  environment variables or mounted files, validated once at startup.
- Mount credential files (service-account JSON, keys) under `/run/secrets/` and
  point the environment variable at that absolute path. Do not mount them under
  `/root`, which a non-root user cannot read, and do not use relative paths.
- Secrets **MUST NOT** appear in Dockerfiles, Compose YAML, labels, build args,
  command-line arguments, logs, examples, or committed `.env` files. Compose
  `env_file` is configuration convenience, not secret storage.
- Examples use unmistakable placeholders such as `<DATABASE_PASSWORD>`. Never
  ship working default credentials such as `admin`/`admin` or `${VAR:-redis}`.

## 15. Compose

- Omit the obsolete top-level `version:` key.
- Separate development and production with explicit files. Development bind
  mounts, source watchers, and debug ports **MUST NOT** reach production; a
  source bind mount over a production image hides its build output.
- Do not set `container_name` in single-stack Compose. Reach other services by
  service name. The Dokploy exception is in §16.
- Do not publish database, cache, queue, or monitoring ports. When local access
  is required, bind to `127.0.0.1:<HOST_PORT>:<PORT>`, never `0.0.0.0`.
- Redis **MUST** require authentication. Load `requirepass` from a mounted secret
  config file (`redis-server /run/secrets/redis.conf`); an unread
  `REDIS_PASSWORD` variable does nothing. Healthchecks pass the password through
  `REDISCLI_AUTH`, never `-a` on the command line.
- `depends_on` orders startup only. Applications still retry dependencies with
  bounded backoff.
- Render and review with `docker compose config` before use.

## 16. Single-Host Dokploy Profile

This is the default deployment profile for the owner's services unless the
repository declares another platform.

- Keep the repository's file split, typically `docker-compose.yaml` for local
  work, `docker-compose.dokploy.yaml` for production, and
  `docker-compose.dokploy-dev.yaml` for development. Database and cache stacks
  live in their own files under `database/<engine>/`.
- CI builds once per commit and pushes `<registry>/<app>:<commit-sha>`, plus an
  optional `main` or `dev` alias. Compose deploys the immutable SHA tag through a
  variable; rollback redeploys a previous SHA. A mutable alias with
  `pull_policy: always` is not the deployment identity.
- Stacks share the external `dokploy-network`. Expose a cross-stack DNS name with
  a network `aliases:` entry. Set `container_name` only when another stack must
  reach a fixed name and an alias cannot serve.
- Dokploy routes ingress through its proxy labels. Do not publish application
  ports on the host.
- The Compose `healthcheck` is the single probe (§13).

```yaml
services:
  app:
    image: ghcr.io/<owner>/<app>:${IMAGE_TAG:?set IMAGE_TAG to the commit SHA}
    environment:
      APP_PORT: "8080"
      DB_HOST: app-postgres
      GOOGLE_APPLICATION_CREDENTIALS: /run/secrets/service-account.json
    volumes:
      - ./secrets/service-account.json:/run/secrets/service-account.json:ro
    healthcheck:
      test: ["CMD", "/healthcheck"]
      interval: 10s
      timeout: 3s
      retries: 5
    restart: unless-stopped
    networks:
      - dokploy-network

networks:
  dokploy-network:
    external: true
```

```yaml
services:
  postgres:
    image: postgres:<SUPPORTED_MAJOR>-alpine
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/postgres_password
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./secrets/postgres_password:/run/secrets/postgres_password:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 10
    networks:
      dokploy-network:
        aliases:
          - app-postgres

volumes:
  postgres-data:

networks:
  dokploy-network:
    external: true
```

## 17. Migrations and State

- Applications **MUST NOT** run schema migrations at startup. Run migrations as a
  one-shot command or job (for example a `migrate` service with
  `restart: "no"`) from the same image tag before the rollout.
- Schema changes **MUST** tolerate old and new application versions running
  together. Destructive changes use expand, backfill, and contract phases.
- Containerized databases **MUST** use durable named volumes with backup and
  restore procedures, and a supported major version.
- Application containers are disposable. Uploads, sessions, and job state
  **MUST NOT** live in the container layer. Never remove persistent volumes in a
  routine deploy.

## 18. Logs, Resources, and Monitoring

- Log structured events to stdout/stderr. Do not write log files inside the
  container or to host bind mounts.
- Set realistic memory and CPU limits in the syntax the runtime enforces.
- Monitoring stacks **MUST** use pinned images, authentication, private
  networks, and no default credentials. Never publish Prometheus with
  `--web.enable-lifecycle`, and never mount `/` or the Docker socket into an
  exporter without a reviewed need.

## 19. Additional Release Platforms

Apply these only when the repository declares the platform or policy.

- **Multi-architecture:** declare the platforms, build tools on `BUILDPLATFORM`,
  produce native artifacts per `TARGETARCH`, and smoke-test every published
  platform. Single-host deployments build only their host architecture.
- **Digest promotion:** when policy requires it, push once, record the digest,
  and deploy by digest instead of tag.
- **SBOM, provenance, signing, scanning:** attach SBOM and provenance to the
  digest, sign with protected or keyless keys, and scan the final image for every
  platform before release.
- **Kubernetes:** the image must work with a numeric non-root security context, a
  read-only root filesystem, dropped capabilities, injected configuration, and
  pod probes. Readiness turns false before shutdown; `preStop` delays do not
  replace signal handling.

## 20. Verification

Adapt commands to repository scripts and available tools:

```bash
docker buildx build --check -f <DOCKERFILE> <CONTEXT>
docker buildx build --load -t <LOCAL_TEST_TAG> -f <DOCKERFILE> <CONTEXT>
docker image inspect <LOCAL_TEST_TAG>
docker run --rm --read-only --cap-drop=ALL \
  --security-opt=no-new-privileges --tmpfs /tmp:size=64m <LOCAL_TEST_TAG>
docker compose -f <COMPOSE_FILE> config --quiet
```

- Inspect the final image for user, entry point, ports, unexpected files, and
  size regressions.
- Start the image with only documented configuration, confirm the healthcheck
  passes, serve a smoke request, and confirm clean exit on `SIGTERM`.
- Confirm required writable paths work as the non-root user and that build tools,
  source, credentials, and caches are absent from the final stage.
- Report exact commands, results, skipped checks, and remaining risk. Never claim
  a check passed when it did not run.
