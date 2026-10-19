# Repository Harness Guideline

Read this file only for repository setup, documentation, planning, CI, or
process work. `general.md` holds the rules every task follows, including
precedence (§2).

If the repository already defines a harness workflow (for example `harness.db`,
`docs/FEATURE_INTAKE.md`, stories, lanes, maturity levels, or traces), follow
it. Use this file to fill gaps it does not cover, never to replace it.

## 1. Source of Truth

Each durable fact SHOULD have one canonical home. Other files link to it rather
than copy it.

| Concern | Canonical home |
| --- | --- |
| Intended user-visible behavior | Product contract and public schema |
| Current executable behavior | Code and behavior-matched tests |
| Architecture direction | Architecture docs and accepted ADRs |
| Repository operation | `AGENTS.md`, README, and canonical scripts |
| Durable change memory | The repository's plan or story system |
| Deployment and recovery | Versioned configuration and runbooks |
| Historical rationale | ADRs and Git history |

## 2. `AGENTS.md`

The root `AGENTS.md` SHOULD be concise and include read-only versus
change-authorized rules, a short repository map, exact setup and validation
commands, critical architecture, security, and generated-file boundaries, and
links to product docs, ADRs, plans, and runbooks.

A nested `AGENTS.md` SHOULD exist only for materially different ownership,
commands, technologies, or constraints. It MUST state its scope and contain only
local differences.

Commit `.agents/` when guidelines are installed there; an `AGENTS.md` that links
to an ignored directory points at nothing in fresh clones, CI, and worktrees.

## 3. README and Onboarding

The README MUST let a new contributor reach a working state without oral
knowledge: purpose and non-goals, prerequisites, configuration and first-run
steps, canonical format, lint, test, build, and run commands, a smoke test with
its expected result, and common setup failures. Test onboarding from a clean
checkout. Setup scripts SHOULD fail with actionable messages instead of
rewriting unknown state.

## 4. Product, Architecture, and ADRs

- Product docs describe intended behavior by capability: consumer and outcome,
  scope and non-goals, inputs, outputs, errors, permissions, invariants,
  compatibility obligations, and acceptance examples. Implementation convenience
  MUST NOT supply product policy.
- Architecture docs explain what the tree does not: runtime components and
  dependency direction, trust and transaction boundaries, data ownership,
  external systems and failure assumptions, and known exceptions. They describe
  the current system, never an aspirational redesign.
- Cross-boundary access uses explicit interfaces. Prevent important dependency
  cycles mechanically.
- Write an ADR for consequential, durable decisions (architecture, security,
  data ownership, compatibility, major dependencies). Record context, options,
  decision, consequences, and the reversal path. Supersede an accepted ADR with
  a linked new one instead of rewriting it.

## 5. Planning

Use a short plan in the working context for bounded work. Use a durable plan
only when work spans sessions or contributors, has consequential sequencing, or
needs reviewable decisions. Keep one evolving file per change in the
repository's plan location, update it as understanding changes, and record its
final disposition. A plan is memory, not proof.

```markdown
# Plan: <bounded outcome>

## Outcome and acceptance criteria

- <observable result>

## Scope and non-goals

## Authority and open decisions

## Plan

1. <next meaningful step>

## Validation

- <behavior> → <command or observation>

## Rollout, rollback, and recovery

## Progress and blockers
```

## 6. Commands, CI, and Hooks

- Consumer repositories own their commands. Discover them from README files,
  manifests, scripts, CI, and runbooks; never invent them.
- Canonical commands run from a documented directory, return nonzero on
  failure, are noninteractive in CI, and print actionable failures. Do not add
  wrappers that only rename a clear command.
- CI SHOULD run the applicable checks: format, lint, type, unit, integration,
  build, generated-artifact drift, secrets, and dependencies. Required checks
  MUST NOT be skipped by fragile filters; retries MUST NOT conceal flakiness.
- Hooks optimize feedback and MUST NOT be the only enforcement. Keep pre-commit
  fast, never require production access, and never report a bypassed hook as
  proof.

## 7. Generated Artifacts

Generated files need a canonical source and a deterministic command. Edit the
source, not the output. If output is tracked, CI SHOULD detect drift. Pin
generator versions and keep machine paths, timestamps, and secrets out of
generated files.

## 8. Runbooks and Documentation Freshness

- Write runbooks for recurring, privileged, or failure-prone operations: purpose
  and permissions, stop conditions, commands with placeholders, expected
  signals, rollback, verification, and last-tested date.
- Documentation changes with the contract or operation it describes. Remove or
  archive obsolete commands and policies so current-tree searches find only
  current authority.

## 9. Feature Flags

Each flag needs an owner, purpose, default, target environments, safe failure
behavior, and removal condition. Flags MUST NOT replace authorization. Remove
stale flags and dead branches.

## 10. Improving the Harness

Change process only in response to an observed need. Observe a baseline,
identify the missing instruction or check, make one falsifiable change, validate
it with native commands, and confirm a fresh agent run used it. Keep, revise, or
remove it based on that result. Consequential policy changes require human
authority.

## 11. New-Repository Checklist

Stop when needs are met:

1. Define purpose, consumers, scope, and non-goals.
2. Add manifests, lockfiles, ignore rules, and safe configuration examples.
3. Make setup, run, test, and build work from a clean checkout.
4. Write a concise README with a smoke test.
5. Add compact root `AGENTS.md` instructions.
6. Add format, lint, type, and behavior checks behind canonical commands.
7. Configure checked-in CI.
8. Document product contracts, public schemas, and consequential boundaries.
9. Add ADRs, runbooks, and durable plans only when a real need appears.
