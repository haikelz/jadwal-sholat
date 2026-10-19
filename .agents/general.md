# General Engineering Guideline

## 1. Purpose

This file holds the rules every task follows, in every repository. Read it with
`preferences.md`. Read `harness.md` only for repository setup, documentation,
planning, CI, or process work.

If the repository defines its own harness workflow (for example `harness.db`,
`docs/FEATURE_INTAKE.md`, stories, lanes, or traces), follow it. These
guidelines add no process of their own on top of it.

## 2. Requirement Language and Precedence

The keywords **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **AVOID** are
normative. A SHOULD may be overridden when the reason is explicit and safety is
preserved.

When instructions conflict, the higher tier wins:

1. Applicable law, safety constraints, and platform-enforced policy.
2. The current authorized request and its acceptance criteria.
3. Repository-local instructions (the closest `AGENTS.md` first), product
   contracts, public schemas, and accepted ADRs.
4. Repository tooling configuration: formatter, linter, compiler, and CI.
5. The owner profile for the language (`haikel-go.md`,
   `haikel-javascript-typescript.md`).
6. `preferences.md`.
7. Framework, persistence, and runtime guidelines (`echo.md`, `nextjs.md`,
   `docker.md`, and similar).
8. Base language guidelines (`go.md`, `javascript-typescript.md`).
9. This file and `harness.md`.

A conflict that a higher tier already resolves needs no report; follow the
higher tier. Surface a conflict only when two sources in the same tier disagree
or when no source decides between materially different externally visible
outcomes. In that case, obtain human authority before choosing.

## 3. Mutation Authority

- Questions, reviews, explanations, diagnosis, comparisons, and planning are
  read-only unless change authority is explicit.
- Discovery does not grant mutation authority. Finding a defect, stale document,
  or missing check MUST NOT be treated as permission to fix it.
- In read-only work, MUST NOT edit files, install dependencies, run migrations,
  or initialize tool state. Prefer non-mutating commands and avoid commands
  known to write caches, lockfiles, or generated files.
- In change work, modify only what the requested outcome needs and preserve
  unrelated work in the tree.
- When `guidelines/tutor.md` is installed (the default), the owner writes the code: the agent
  explains, hands over reference code in the reply, and reviews. It edits files
  only when the current request names the file and asks for the edit.

## 4. Context Retrieval

Start with the request, applicable `AGENTS.md` files, worktree state, the
nearest authoritative contract, then the target code, configuration, and tests.
Expand to architecture, ADRs, schemas, and adjacent code only when the task
needs them. Stop when enough authoritative evidence exists to act. Do not read
the whole repository by default; skip archives, generated output, dependencies,
and caches.

## 5. Normative Authority and Observed Truth

Contracts, schemas, ADRs, policy, and acceptance criteria state what the system
MUST do. Code, tests, configuration, and runtime behavior show what it does now.
Observed behavior can reveal drift but MUST NOT be promoted automatically into
policy.

- Tests MUST NOT be changed merely to make an incorrect implementation pass.
- Documentation MUST NOT be changed merely to rationalize accidental behavior.
- When the two disagree and no authority decides, preserve safety and
  compatibility and stop for a human decision.

## 6. Proof

Completion requires behavior-matched executable or observable proof. Plans,
checklists, labels, and code review alone are not proof.

- Match proof to the change: formatter for formatting, type checks for
  interfaces, unit tests for local behavior, integration tests for storage,
  network, or process boundaries, end-to-end observation for user flows,
  migration rehearsal for persistent state.
- A narrow unit test MUST NOT be presented as proof of cross-system behavior.
  A broad suite MAY be unnecessary for a narrow change.
- When an invariant is encoded (authorization, schema or input validation,
  dependency boundaries, migration preconditions), prove a positive case, a
  negative case, and that the negative case fails for the intended reason.
- State the level of every enforcement claim: a local command, an optional hook,
  checked-in CI, an observed CI run, or branch protection. One level does not
  prove another.

## 7. Honest Reporting

- Report only proof that was obtained. Disclose failed, skipped, and partial
  checks.
- A no-mutation claim needs more than a clean `git diff`. Consider untracked and
  ignored files, caches, generated output, containers, and databases touched by
  the commands that ran, and qualify the claim when a tool may have written
  outside Git.
- If a tool, credential, service, or network path is unavailable, do not bypass
  security or fabricate evidence. Run the unaffected checks, report partial
  validation, and state the recovery action. A fallback that exercises different
  behavior is not equivalent proof.
- Do not retry a potentially non-idempotent operation blindly after an uncertain
  result.

## 8. Security, Secrets, and Fixtures

- Secrets MUST NOT enter code, docs, examples, logs, plans, fixtures, snapshots,
  artifacts, or reports. Use placeholders such as `<SERVICE_TOKEN>` and
  `<DATABASE_URL>`.
- Redact sensitive values from proof.
- Enforce authorization at trusted boundaries; authorization changes need
  positive and negative proof.
- Fixtures SHOULD be minimal, synthetic, and deterministic. Production data MUST
  NOT be used without an approved sanitization process.
- Destructive scripts MUST require explicit target selection.
- Confirmed secret exposure MUST follow the owned incident process, including
  revocation.

## 9. Dependencies

Before adding a dependency, check the standard library, the platform, the
framework, and existing dependencies. Use the repository's package manager and
manifest. Lockfiles MUST NOT be hand-edited. AVOID duplicate libraries,
unpinned remote scripts, abandoned packages, and dependencies for trivial code.

## 10. Git

- Inspect status before editing and before completion.
- Preserve unrelated work. Stage only intended files.
- Commit according to the repository's instructions; when they say nothing,
  commit only when asked.
- Keep commits coherent and reviewable. Separate generated or mechanical changes
  when that helps review.
- Do not rewrite shared history without explicit authority.

## 11. Migrations and Rollout

Persistent-data, API, event, and configuration changes MUST consider
mixed-version operation. Prefer expand, migrate, contract: add compatible
structures, deploy compatible readers and writers, backfill with restartable
work, switch deliberately, then remove obsolete structures after the rollback
window. Migrations MUST be idempotent or safely resumable and MUST state lock,
duration, failure, and recovery expectations. "Revert the commit" is not a
rollback plan when external effects or incompatible data exist.

## 12. Definition of Done

Read-only work is done when the request is answered, claims rest on repository
evidence, and facts, inference, and uncertainty are distinguished.

Change work is done when:

- Acceptance criteria are satisfied or a blocker is explicit.
- Scope is bounded and unrelated work is preserved.
- Behavior-matched proof has a known outcome, including positive and negative
  proof for encoded invariants.
- Contracts, schemas, docs, generated output, and runbooks are current where
  affected.
- No secrets, placeholders, or accidental artifacts were introduced.
- The final diff and status were reviewed.
- The report states outcome, changed components, exact proof and results, and
  remaining uncertainty.
