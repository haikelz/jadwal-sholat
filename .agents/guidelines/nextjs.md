# Next.js App Router Coding-Agent Guideline

This guide covers Next.js App Router applications; do not introduce Pages Router conventions. Precedence follows `general.md` §2. Where `haikel-javascript-typescript.md` disagrees with this guide, the profile wins.

## 1. Scope and Version Discovery

Before editing, an agent **MUST** establish facts rather than rely on remembered Next.js behavior:

1. Read instruction files, the root and application `package.json` files, lockfile, workspace configuration, `next.config.*`, TypeScript configuration, lint/format configuration, test configuration, and relevant environment examples. Never open populated secret files.
2. Determine the installed versions of Next.js, React, the package manager, Node.js, and relevant libraries from manifests and the lockfile. Major versions affect request APIs, caching, middleware naming, Server Actions, and build behavior.
3. Determine whether the application uses `src/app` or `app`, whether it is standalone or in a monorepo, and which project owns the target.
4. Inspect neighboring routes, providers, services, schemas, components, tests, and import aliases before choosing placement.
5. Check whether request APIs such as `params`, `searchParams`, `cookies()`, and `headers()` are asynchronous in the installed version. Use the installed API, not compatibility casts.
6. Check official documentation for the installed major/minor version when behavior is uncertain or recently changed.
7. Trace cache tags, query keys, redirects, authorization, metadata, and public contracts before changing them.

### MUST

- Make the smallest complete change and preserve the current package manager and router.
- Treat experimental flags as version-bound. Verify that each remains supported before adding or retaining it.
- Keep framework-generated files and build output out of manual edits.

### SHOULD

- Record version-sensitive assumptions in code only when they are not obvious from types or configuration.
- Prefer stable framework APIs over experimental features unless requirements demand otherwise.

### AVOID

- Upgrading Next.js, React, lockfiles, or unrelated dependencies as part of a feature fix.
- Copying examples from a different Next.js major version.
- `next lint`, which Next.js 16 removed. Run `eslint .` with the flat `eslint.config.mjs`.

### Next.js 16 facts

- The request interception file is `proxy.ts` exporting `proxy()`. `middleware.ts` applies only to Next.js 15 and earlier.
- `params`, `searchParams`, `cookies()`, and `headers()` are asynchronous. Prefer the generated `PageProps<"/route">`, `LayoutProps<"/route">`, and `RouteContext<"/api/route">` helpers over hand-written prop types, and do not shadow them with local types of the same name.
- Turbopack is the default bundler. Build with `next build --webpack` when a webpack-only plugin, such as a PWA plugin, is installed.
- `revalidateTag(tag, profile)` requires a `cacheLife` profile such as `"max"`. Use `updateTag(tag)` in a Server Action that needs read-your-own-writes, and `refresh()` to refresh the client router cache from a Server Action.
- With `cacheComponents` enabled, cache server work with `"use cache"` plus `cacheLife()` and `cacheTag()` from `next/cache`. Without it, `fetch` caching options still apply.

## 2. Project and Monorepo Placement

The ownership model is:

```text
src/
  app/                           route tree, framework files, route handlers
  components/ui/                 domain-free accessible primitives
  components/common/             shared application composition
  components/<area>/<feature>/   feature pages, tables, forms, dialogs
  hooks/<resource>.ts            React Query hooks per resource
  lib/schemas/<resource>.ts      Zod schemas and inferred types
  services/<resource>.ts         typed transport functions
  types/                         cross-cutting types only
  server/                        server-only use cases and auth, when needed
```

In a monorepo, this tree lives under `apps/<app>/`, and `packages/` holds only genuinely shared UI, contracts, and tool configuration.

### MUST

- Put code in the project that owns its runtime and deployment. Use workspace packages only for capabilities genuinely shared by multiple projects.
- Keep route files thin: URL contract, metadata, request parsing, server composition, and route-specific boundaries.
- Respect dependency direction: routes/features may depend on shared primitives; primitives MUST NOT depend on routes or domain features.
- Mark server-only modules with `import "server-only"` when an accidental client import would expose credentials or privileged behavior.
- Configure package transpilation, exports, and task dependencies explicitly when a workspace package needs them.

### SHOULD

- Colocate feature-private components near the feature; use `_components` or `_lib` inside a route only when the code is truly route-private.
- Expose narrow package entry points instead of importing package internals.
- Keep shared configuration packages free of application runtime assumptions.

### AVOID

- A universal `utils.ts`, giant barrel files, or a shared package containing one application's business logic.
- Deep imports across application boundaries.
- Adding libraries to the workspace root when only one app uses them.

## 3. App Router Structure

### 3.1 Segments and special files

- `page.tsx` makes a segment publicly reachable.
- `layout.tsx` persists across navigation and owns stable shared structure.
- `template.tsx` creates a new instance on navigation; use it only when remount semantics are intentional.
- Parenthesized route groups organize routes and select layouts without changing the URL.
- Dynamic segments use `[id]`, catch-all segments use `[...parts]`, and optional catch-all segments use `[[...parts]]`.
- Parallel and intercepting routes are advanced navigation tools, not default organization mechanisms.

### MUST

- Provide one root layout with `<html>` and `<body>`.
- Keep each `page.tsx` and `layout.tsx` a Server Component unless client behavior is truly required.
- Validate dynamic segments before use and call `notFound()` for absent resources when a 404 is the correct contract.
- Ensure route groups do not accidentally create two pages resolving to the same URL.
- Use a layout for persistent navigation or providers and a template only for deliberate reset/re-entry behavior.

### SHOULD

- Use route groups to separate layout/auth concerns, not merely to shorten imports.
- Prefer ordinary nested routes before parallel/intercepting routes. Use interception for URL-addressable modal navigation that also has a full-page fallback.
- Place providers as deep as practical so static server-rendered regions remain outside client boundaries.

### AVOID

- Putting all application providers, data, and interactivity in the root layout.
- Reading pathname or search state merely to recreate layout routing that the segment tree can express.
- Using `template.tsx` as a substitute for fixing stale local state.

## 4. Server and Client Boundaries

Server Components are the default. They may fetch data, access server configuration, and render Client Components. Client Components may not import Server Components as modules, but they may receive rendered server content through serializable props such as `children`.

### MUST

- Add `"use client"` only at the smallest interactive entry point that needs state, effects, event handlers, context, or browser APIs.
- Pass only React-serializable values across the server/client boundary. Convert database classes, `Date`, `Map`, errors, and provider responses into explicit view models where needed.
- Keep secrets, privileged clients, filesystem access, and server SDKs out of client dependency graphs.
- Treat every Client Component input and every Server Action argument as untrusted.
- Import browser-only heavy libraries dynamically, with server rendering disabled only when the library truly cannot render on the server.

### SHOULD

- Fetch on the server when data is needed for first render, SEO, or authorization and does not require live client interaction.
- Pass minimal initial data rather than large raw responses.
- Use composition to keep static markup server-rendered around small client islands.

### AVOID

- Marking a page or layout client-side to solve one interactive control.
- Using `useEffect` to fetch initial page data that a Server Component can fetch.
- Importing server-only modules through a barrel that is also consumed by clients.
- Disabling hydration warnings globally or using them to hide nondeterministic rendering.

## 5. Parameters, Search Parameters, and Navigation

Use the generated route prop helpers:

```tsx
export default async function Page({
  params,
  searchParams,
}: PageProps<"/items/[itemId]">) {
  const { itemId } = await params;
  const query = listQuerySchema.parse(await searchParams);
  const item = await getItem(itemId);
  if (!item) notFound();

  return <ItemView item={item} query={query} />;
}
```

### MUST

- Runtime-validate and deliberately coerce route and query input. Account for repeated query keys (`string[]`) and missing values.
- Use `useSearchParams`, `usePathname`, and `useRouter` only in Client Components.
- Use `redirect()`/`permanentRedirect()` for server navigation and `<Link>` for user navigation.
- Preserve unrelated query parameters when changing one filter unless the UX explicitly resets them.
- Encode user-controlled path and query values with framework/URL APIs; never concatenate unsafe redirect destinations.

### SHOULD

- Keep shareable filters, pagination, sort, selected tabs, and search in the URL.
- Use a typed URL-state library if already installed and consistently adopted.
- Debounce replace-navigation for free-text search and use push-navigation for meaningful history steps.

### AVOID

- Mirroring URL parameters into local state with effects.
- Treating `searchParams` as a plain object across versions without checking its contract.
- Open redirects. Allow only local paths or an explicit origin allowlist.

## 6. Metadata, Fonts, and Images

### MUST

- Define global defaults in root `metadata`; use static `metadata` or `generateMetadata` near the owning route.
- Ensure titles, canonical URLs, robots directives, Open Graph data, and social images reflect the deployed environment and page visibility.
- Use `next/font` for supported local or hosted fonts and apply its generated class/variable without introducing layout shift.
- Use `next/image` for content and optimized raster images. Supply meaningful `alt`, intrinsic dimensions or `fill` with a sized parent, and a correct `sizes` value.
- Use empty `alt=""` for decorative images, not filenames.
- Restrict remote image patterns to required protocols, hosts, ports, and path prefixes.

### SHOULD

- Generate route metadata from the same validated data used by the page and rely on request memoization where supported.
- Mark only true above-the-fold largest-content images as priority/preload candidates.
- Use SVG or CSS for simple icons and decoration; use the established icon library.

### AVOID

- Client-side metadata mutation, duplicate `<head>` tags, broad remote image wildcards, or priority on every image.
- Raw `<img>` for normal content merely to bypass image configuration.
- Embedding large base64 assets in components.

## 7. Loading, Errors, Not Found, and Suspense

### MUST

- Use `loading.tsx` or explicit `<Suspense>` boundaries where streaming improves perceived performance.
- Make fallbacks match final geometry closely enough to avoid layout shift and expose accessible loading status when appropriate.
- Implement `error.tsx` as a Client Component and provide a meaningful retry through its `reset` callback when recovery is possible.
- Use `global-error.tsx` only for root failures and include its own `<html>` and `<body>` when required by the installed version.
- Use `not-found.tsx` and `notFound()` for missing resources, not generic caught errors.
- Log/report unexpected errors server-side while showing safe user-facing copy.

```tsx
"use client";

type ErrorPageProps = {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <section role="alert">
      <h2>Something went wrong</h2>
      <button onClick={reset} type="button">
        Try again
      </button>
    </section>
  );
}
```

### SHOULD

- Place Suspense around the slow subtree, not around the whole page by default.
- Separate initial loading, background refresh, empty, unauthorized, and error states.
- Let expected domain outcomes use typed return values; reserve thrown errors for exceptional failures and framework control flow.

### AVOID

- Catching `redirect()` or `notFound()` in broad `try/catch` blocks.
- Empty spinners with no context, page-wide blocking for one widget, or leaking error messages/stacks.
- Calling `reset()` without fixing or refetching the failing dependency.

## 8. Proxy, Authentication, and Authorization

Next.js 16 uses `proxy.ts`; earlier versions use `middleware.ts`. This layer runs broadly and often in a constrained runtime.

### MUST

- Keep proxy logic lightweight: routing, locale, coarse session presence checks, safe redirects, and headers.
- Configure a precise matcher that excludes static assets, image optimization, metadata files, and unrelated endpoints.
- Verify session integrity with a runtime-compatible mechanism. Never trust an unsigned role or user identifier cookie.
- Enforce authorization again at every privileged data access, Route Handler, and Server Action. UI hiding and proxy redirects are not authorization.
- Derive actor identity from verified server auth context, not submitted fields.
- Use `httpOnly`, `secure` in production, appropriate `sameSite`, scoped `path`, expiry, and CSRF protection for cookie-based mutation flows.
- Return 401 for unauthenticated API access and 403 for authenticated but unauthorized access; use redirects primarily for document navigation.

### SHOULD

- Centralize session retrieval and authorization policies in server-only modules.
- Preserve a validated local return URL through login flows.
- Use a Node runtime server boundary when auth libraries or cryptography are not edge-compatible.

### AVOID

- Database calls, large dependencies, or full permission loading on every proxy match.
- Capturing cookies at module initialization.
- Storing sensitive bearer tokens in `localStorage`.
- Treating the proxy, disabled buttons, or hidden links as sufficient access control.

### Same-origin backend proxy

Client services MAY call same-origin Route Handlers such as `/api/backend/...` that forward to the backend API and attach the session from an `httpOnly` cookie. This keeps tokens out of browser JavaScript. Server Components still call server functions directly instead of fetching these handlers.

## 9. Route Handlers and Server Actions

Choose the boundary according to consumers:

- A Route Handler is appropriate for public/internal HTTP contracts, webhooks, callbacks, downloads, and non-React clients.
- A Server Action is appropriate for mutations initiated by this React application and progressive-enhancement forms.
- Neither boundary should contain the core business use case.

### MUST

- Validate params, query, headers, body, and form data at the boundary; impose body/file size and content-type limits.
- Authenticate and authorize before privileged work.
- Delegate to a server-only service/use case, map known failures to intentional responses, and hide internal errors.
- Use correct status codes and response headers. Set content type, cache policy, content disposition, and CORS only as required.
- Verify webhook signatures against the raw body before parsing or acting; make retries idempotent.
- Validate Server Action arguments exactly as HTTP input. Return serializable expected-error state or throw unexpected failures.
- Revalidate only affected paths/tags after successful mutation, or redirect after success. Do not invalidate before the write commits.

```ts
"use server";

import { itemInputSchema } from "@/lib/schemas/item";
import { requireUser } from "@/server/auth";
import { createItem } from "@/server/items";
import { updateTag } from "next/cache";
import { z } from "zod";

export async function createItemAction(input: unknown) {
  const user = await requireUser();
  const parsed = itemInputSchema.safeParse(input);
  if (!parsed.success) {
    return { issues: z.flattenError(parsed.error), ok: false as const };
  }

  const item = await createItem(user, parsed.data);
  updateTag("items");

  return { id: item.id, ok: true as const };
}
```

### SHOULD

- Use a discriminated result type for expected validation/conflict outcomes.
- Use `useActionState` where it improves progressive form feedback, subject to installed React/Next APIs.
- Keep Route Handlers thin and test their HTTP contract separately from use cases.

### AVOID

- Creating an internal Route Handler solely so a Server Component can call the same application over HTTP. Call the server service directly.
- Trusting hidden form fields for ownership, price, role, or permission.
- Broad `catch` blocks that convert framework control-flow errors to 500 responses.
- Returning raw ORM entities, Axios responses, stack traces, or provider errors.

## 10. Services and Server Data Fetching

### MUST

- Put transport mechanics and server data access outside components. Return validated contracts or domain/view models, not raw response wrappers.
- Use the native server `fetch` integration when its memoization/cache semantics are useful; otherwise make cache behavior explicit.
- Specify freshness intentionally with the installed APIs: uncached/request-time data, timed revalidation, `"use cache"` with `cacheLife`, or tag/path invalidation. Defaults have changed between Next.js versions.
- Include identity/tenant/permission scope in any server cache key. Never share personalized data through a public cache.
- Apply timeouts/abort signals, normalize known errors, and avoid unbounded retries.
- Read request-scoped cookies and headers inside request execution, not during module evaluation.

```ts
import "server-only";

export async function getCatalog(): Promise<CatalogItem[]> {
  const response = await fetch(`${serverEnv.API_URL}/catalog`, {
    next: { revalidate: 300, tags: ["catalog"] },
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) throw new UpstreamError(response.status);

  return catalogSchema.parse(await response.json());
}
```

### SHOULD

- Fetch independent resources in parallel and dependent resources sequentially.
- Deduplicate repeated non-`fetch` server work with the supported request memoization primitive.
- Define explicit data transfer objects between persistence, transport, and UI when their shapes differ.

### AVOID

- Accidental waterfalls, fetching entire records when only a summary is rendered, or setting every request to uncached.
- Caching access tokens, cookies, or mutable personalized responses globally.
- Calling a browser-oriented Axios singleton from a Server Component when direct server access is available.

## 11. React Query and Client Server-State

Use React Query for client-owned asynchronous server state: polling, optimistic mutations, user-triggered refetching, and long-lived interactive screens. Do not duplicate data already owned effectively by a Server Component without a UX reason.

Hook modules, key functions, invalidation ownership, and toast placement follow `haikel-javascript-typescript.md` §5. Hook modules start with `"use client"`.

### MUST

- Create one stable `QueryClient` per provider lifetime with `useState(() => new QueryClient(...))`.
- Include every input that changes the result in the query key.
- Set `staleTime`, garbage collection, retry, and refetch behavior deliberately.
- Cancel conflicting requests and provide rollback context for optimistic updates.

### SHOULD

- Normalize filter objects so equivalent URLs create equivalent keys.
- Prefetch/dehydrate on the server only when it measurably improves first render and the hydration boundary is correctly scoped.
- Distinguish initial pending state from background fetching and stale content.

### AVOID

- Anonymous keys such as `[page, limit]`, functions/nonserializable values in keys, and blanket cache invalidation.
- Duplicating React Query data into a global store.
- Creating query hooks that hide required parameters or authorization context.
- Copying server cache durations into client `staleTime` without considering UX.

## 12. State Ownership

Use one owner for each state:

1. **Server state:** Server Components/cache or React Query.
2. **URL state:** shareable filters, pagination, sort, search, and navigable selection.
3. **Global client state:** small cross-route UI state or client-only workflow state.
4. **Local state:** ephemeral interaction inside the nearest component.
5. **Derived state:** compute during render or in a selector.

### MUST

- Keep server data out of Jotai/Redux-like stores unless offline/client workflow requirements genuinely require a synchronized copy.
- Scope global atoms/stores to avoid user data surviving logout or tenant changes.
- Derive values instead of synchronizing duplicates with effects.

### SHOULD

- Use component state first; promote state only when multiple distant owners need it.
- Put a stateful provider as low as practical.

### AVOID

- A global store for every dialog, input, and fetched response.
- Storing React elements, router instances, request objects, or server credentials in global state.
- Effects that continuously copy props, URL state, query data, and form data into each other.

## 13. Forms with React Hook Form and Zod

### MUST

- Make the Zod schema the runtime source of truth and infer the input type. Keep output types distinct when transforms/coercion change shape.
- Configure `zodResolver`, explicit defaults, correct controlled/uncontrolled behavior, and field names that match the schema.
- Validate again on the trusted server boundary; client validation is UX, not security.
- Map server field errors to fields and cross-cutting failures to a form-level message.
- Disable or guard duplicate submission while pending, while preserving accessible status feedback.
- Build a new payload instead of mutating form values.
- Validate file count, size, type, and content server-side; browser MIME/type checks are insufficient.

```tsx
const contactFormSchema = z.object({
  email: z.email("Enter a valid email address"),
  name: z.string().trim().min(1, "Enter a name"),
});

type ContactFormValues = z.input<typeof contactFormSchema>;

const form = useForm<ContactFormValues>({
  defaultValues: { email: "", name: "" },
  resolver: zodResolver(contactFormSchema),
});
```

Field state, `setError("root")`, and `aria-live` error rendering follow `haikel-javascript-typescript.md` §4.

### SHOULD

- Use native input types, autocomplete tokens, and browser semantics.
- Focus the first invalid field, keep entered values after recoverable errors, and announce result status.
- Use schema preprocessing only for intentional HTML serialization differences such as empty strings or numeric inputs.

### AVOID

- `valueAsNumber` without handling `NaN`, all-optional update schemas without business rules, or schema/type duplication.
- Resetting a form on failed submission.
- Using placeholders as labels or disabling submit merely because untouched fields are empty when validation can explain the issue.

## 14. Component Taxonomy, Dialogs, and Tables

### Component taxonomy

- **UI primitives** are accessible, domain-free controls and visual foundations.
- **Common components** compose primitives into reusable application patterns.
- **Feature components** own domain language, workflows, and feature-specific queries/forms.
- **Route components** connect URL/server data to feature composition.

Preserve this dependency direction and keep business workflows out of primitive files. Naming and export rules follow `haikel-javascript-typescript.md` §2.

### Dialogs

- Use an established accessible dialog primitive with focus trap, labelled title, optional description, Escape handling, focus restoration, and inert background behavior.
- Use an alert dialog for destructive confirmation and state the specific consequence.
- Keep dialog open on recoverable mutation failure; show the error and prevent duplicate submission.
- For URL-addressable detail/create flows, prefer a real route, optionally presented through intercepting routes.
- Avoid nested dialogs, click-only backdrop dismissal for destructive work, and rendering a separate heavy dialog instance in every table row.

### Tables

- Use semantic `<table>`, `<caption>`, `<thead>`, `<th scope>`, and cells for tabular data. Use a list/grid when the content is not tabular.
- Put pagination, filtering, and sorting on the server/URL for large datasets; send explicit sort/filter contracts.
- Provide loading skeletons, empty state, error state, and horizontal overflow or an intentional small-screen alternative.
- Label row action menus with row context and make selection state accessible.
- Use stable row identifiers; never use array indexes for mutable data.
- Avoid loading the full dataset for client pagination, ambiguous icon-only actions, and hiding essential columns without another way to access them.

## 15. Styling and Accessibility

Follow the application's component library, tokens, and class-merging conventions, and `preferences.md` for interface and accessibility quality. Respect `prefers-reduced-motion`, keep server and client markup identical regardless of viewport, and use semantic HTML before ARIA.

## 16. Testing

### MUST

- Test changed behavior at the narrowest useful level and add integration coverage for important boundaries.
- For Server Components, test extracted server functions/use cases and rendered outcomes with tooling that supports the installed version.
- Test Client Components with user-visible role/label queries and realistic user events.
- Cover relevant loading, empty, success, error, not-found, authorization, validation, and retry states.
- Test Route Handlers as HTTP contracts and Server Actions as untrusted mutation boundaries.
- Test query key/invalidation behavior, optimistic rollback, URL serialization, and form payload/error mapping when changed.
- Mock network, time, browser APIs, and providers at boundaries; never call live services.

### SHOULD

- Use the repository runner: `bun test` with colocated `*.test.ts(x)`, flat `test()` calls, and `renderToStaticMarkup` in Bun applications; Vitest or Jest with React Testing Library in those projects. Use Mock Service Worker or an equivalent for HTTP boundaries and Playwright for critical navigation/auth flows.
- Include accessibility assertions and keyboard interaction in component/end-to-end tests.
- Use deterministic factories and fixed time zones for date behavior.

### AVOID

- Snapshot-only coverage, “renders without crashing” as the only assertion, implementation selectors, and mocking the unit under test.
- Tests that depend on execution order, real clocks, production credentials, or generated build output.

## 17. Nx, Packages, PWA, and Observability

Apply this section only when the capability exists or the task introduces it. Production builds and containers follow `docker.md`.

### Workspaces

- Run targets through the workspace's declared commands and project names, and declare cacheable target inputs/outputs accurately.
- Keep package peer/runtime dependencies and exports correct; do not rely on root hoisting or import application source through relative paths from packages.

### PWA and service workers

- Add PWA behavior only for a real offline/installability requirement. Webpack-based PWA plugins require `next build --webpack`.
- Version caches and define update behavior. Never cache authenticated HTML, session endpoints, mutation responses, or sensitive API data.
- Prefer network-first for changing documents/data and cache-first only for immutable revisioned assets. Disable service workers in development/tests and verify against a production build.
- Do not commit generated service-worker bundles unless the tool requires tracked artifacts.

### Observability

- Initialize instrumentation through the supported server/client entry points, once.
- Capture unexpected errors with environment, release, route, and safe correlation identifiers. Do not report expected validation failures as incidents.
- Redact authorization headers, cookies, tokens, passwords, and form contents from logs, traces, and replays. Keep source maps private unless exposure is intended.

## 18. Verification Workflow

The agent **MUST** use repository scripts and the package manager selected by the lockfile. Adapt this sequence to the actual workspace:

```bash
<pm> run format:check
<pm> run lint
<pm> exec tsc --noEmit
<pm> test <changed-test-path>
<pm> run build
```

Command selection follows `haikel-javascript-typescript.md` §8.

### MUST

1. Inspect build output for dynamic-rendering bailouts, route conflicts, unsupported configuration, bundle regressions, and PWA/observability warnings.
2. Exercise changed routes at realistic viewport sizes and test keyboard behavior when UI changed.
3. Inspect the final diff for accidental client boundaries, secrets, debug output, generated files, unrelated formatting, and contract changes.

### SHOULD

- Analyze client bundles when adding dependencies or moving a boundary client-side.
- Build and smoke-test the production container when Docker, output paths, runtime environment, or workspace packaging changes.
- Test a production deployment-like environment for middleware, image hosts, service workers, and instrumentation.

### AVOID

- Using auto-fix as final lint verification.
- Claiming success from development mode alone.
- Deleting caches or lockfiles to hide an unexplained failure.
