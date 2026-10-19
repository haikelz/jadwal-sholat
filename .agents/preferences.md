# Owner Engineering and Product Quality Profile

This document records Haikel's cross-stack working preferences. Read it with
`general.md` for every task. Precedence follows `general.md` §2: repository-local
instructions and the language owner profiles (`haikel-*.md`) win over this file,
and this file wins over framework and base language guidelines.

## 1. Definition of Done

Work is complete only when it is correct, coherent, visually orderly, and
verified at the scope requested. A formatter, linter, type checker, or passing
unit test proves only the property it checks.

- Treat broad language literally. “Every page,” “the entire codebase,” and “all
  handlers” require an inventory of that complete scope and inspection of every
  item, excluding generated or explicitly out-of-scope files.
- Do not sample a few representative files and report a repository-wide cleanup.
- Do not stop at mechanically valid output. Review the formatted result as a
  human reader would: grouping, line length, naming, density, and visual rhythm
  must still make the code easy to scan.
- Preserve behavior during cleanup. Separate refactoring from behavior changes
  when combining them would make review or verification ambiguous.
- Finish the surrounding state of the changed experience. UI work includes
  loading, empty, error, disabled, success, permission, responsive, keyboard,
  and reduced-motion states where applicable.
- Remove temporary files and iteration-only code before completion.
- Report exactly what was inspected and verified. Never turn partial evidence
  into a broad claim.

## 2. Code Should Look Deliberate

The preferred code style is spacious, regular, and easy to trace vertically.
Shorter code is not automatically cleaner code.

- Let the configured formatter own mechanical indentation, alignment, quotes,
  delimiters, and wrapping. Humans and agents still own semantic grouping and
  whether the chosen source structure formats clearly.
- Use one blank line between distinct execution phases. Common phases include
  declarations, parsing, normalization, validation, authorization, I/O, error
  handling, transformation, persistence, side effects, and return construction.
- Keep an operation adjacent to the error handling that belongs to it. Add the
  blank line after that unit, not between the operation and its check.
- Keep related validations and assignments together. Do not add blank lines
  mechanically after every statement.
- Keep framework registration and configuration as one contiguous block. Add a
  blank line only when a separate group marks a real scope, access, or lifecycle
  boundary.
- Keep parsed or bound input beside its validation. Start a new visual group
  only after that input phase succeeds.
- Keep simple delegation as a direct return. Do not introduce a temporary value
  solely to manufacture spacing; reserve visual phases for distinct concerns.
- Prefer vertical forms when a declaration, call, condition, callback, or
  literal contains several meaningful parts. Dense one-line code that technically
  passes formatting is not acceptable when expansion improves scanning.
- Prefer named or keyed fields over positional struct and object construction
  when the values represent domain state, dependencies, results, or errors.
- Give each named field or logical argument its own line when multiple fields or
  arguments are present. Keep trivial empty values and obvious standard-library
  idioms compact when expansion would add no clarity.
- Constructors should show their dependency mapping explicitly. Avoid compressed
  constructor returns and hidden initialization work.
- Keep imports in the order the language owner profile defines (`haikel-go.md`,
  `haikel-javascript-typescript.md`).
- Avoid vague names, one-use wrappers, generic helpers, and abstractions that
  merely relocate code. A new name should expose ownership, remove meaningful
  duplication, or simplify a real boundary.
- Comments explain a constraint, invariant, external requirement, or surprising
  decision. They do not narrate syntax or preserve dead code.
- Code comments, identifiers, logs, and internal error messages are English.
  User-facing text follows the product language.

## 3. Function and File Rhythm

Every function should have an obvious reading path.

- Use guard clauses for invalid or terminal states, then leave breathing room
  before the normal path begins.
- Keep declarations close to their first use, but separate setup from execution
  when they are different concerns.
- Handler, repository, and component phase order is defined in the language
  owner profiles. Follow those sequences instead of inventing a local one.
- In workers, make ownership, bounded iteration, cancellation, retry decisions,
  persistence, and completion visible as separate phases.
- In tests, group arrange, act, and assert when the scenario is nontrivial. Keep
  the setup for one case together and make the behavioral assertion easy to find.
- Split a file only when the resulting files have clear responsibilities. Do not
  create tiny files or layers solely to make a file shorter.

## 4. Frontend Implementation Preferences

For React applications, prefer the established stack when the capability is
needed and the dependencies are available:

- TanStack Query for remote/server state, caching, mutations, invalidation, and
  asynchronous request states.
- TanStack Table for real data tables that need sorting, filtering, pagination,
  selection, or reusable column definitions.
- React Hook Form with Zod for nontrivial forms, with the form value type inferred
  from the schema.
- URL state for shareable filters and pagination; local state for ephemeral UI;
  a client store only for genuinely shared client-owned state.

Do not force these libraries into static content, a one-field interaction, or a
server-rendered path where they add more machinery than value. Browser code
MUST NOT duplicate server state in a client store.

Keep route files thin. Put feature behavior in the feature boundary, transport in
typed service code, schemas near their owned contract, and reusable visual
primitives in the established UI system.

## 5. Interface and Design Quality

Interfaces should feel designed for the product, not assembled from generic
templates.

- Use one coherent design system across the full product surface. Reuse its
  tokens and real components instead of recreating approximate versions with
  arbitrary utility classes.
- Use the selected component library's semantics and theme tokens consistently
  (for example HeroUI or shadcn). Do not keep only the dependency while
  hand-building a conflicting visual language.
- Establish hierarchy through typography, measure, spacing, alignment, and
  contrast before adding decoration.
- Avoid generic dashboard patterns such as decorative grid backgrounds,
  excessive nested cards, repetitive equal-weight panels, arbitrary gradients,
  and decoration without product meaning.
- Give headings and body copy enough width and breathing room. Do not constrain
  product and feature pages into narrow columns that create cramped wrapping.
- Keep spacing deliberate at every breakpoint. Check container widths, section
  rhythm, control density, and optical alignment rather than relying only on a
  spacing scale.
- Use semantic controls, visible focus states, keyboard support, sufficient
  contrast, adequate hit targets, reduced-motion behavior, and meaningful
  labels. Accessibility is part of implementation, not a final patch.
- Preserve SEO fundamentals for public pages: correct landmarks, one coherent
  heading hierarchy, descriptive metadata, crawlable content, canonical URLs,
  meaningful links, and structured data only when truthful.
- For broad redesigns, inspect every route family at representative desktop and
  mobile widths. A polished home page does not prove that product, feature,
  detail, form, and empty-state pages are coherent.
- Verify rendered output when visual quality is part of the request. Source-code
  inspection alone cannot prove typography, overflow, spacing, or responsive
  behavior.

## 6. Product and Interface Writing

Writing should sound natural, specific, and useful in Indonesian or English.

- Match the user's language and level of formality. Prefer direct Indonesian
  when the conversation is in Indonesian; keep technical terms in English when
  translating them would reduce clarity.
- Lead with the concrete point. Remove throat-clearing, repeated conclusions,
  filler transitions, and ceremonial headings.
- Describe what the product does, for whom, and with what evidence. Avoid vague
  claims such as “powerful,” “seamless,” “revolutionary,” “all-in-one,” “solusi
  inovatif,” or “meningkatkan efisiensi” unless the surrounding text proves the
  claim concretely.
- Avoid synthetic contrasts, slogan fragments, exaggerated confidence, and
  repetitive three-item marketing lists.
- Buttons state the action. Errors state what happened and the next safe step.
  Empty states explain why the screen is empty and what action is available.
- Presentation copy should be speakable. Slides support the presenter with one
  clear message, useful evidence, and disciplined text density; they should not
  read like an AI-generated proposal document.
- Edit both Indonesian and English for rhythm, specificity, capitalization, and
  punctuation. Translation is not complete until each version sounds native.

## 7. Review and Verification Discipline

- Run the narrowest useful checks while iterating, then the relevant complete
  suite for the affected boundary.
- For a broad formatting or consistency task, run the formatter first and then
  perform a second semantic pass over the complete declared scope.
- Search for the exact anti-patterns being removed, but review search results;
  regular expressions do not understand intent.
- Inspect the final diff for accidental behavior changes, generated output,
  dependency drift, unrelated cleanup, debug code, and inconsistent treatment
  of similar files.
- A repository-wide claim should state the counted scope and its exclusions.
- Visual work requires rendered checks. Data and mutation work requires behavior
  checks. Shared or concurrent Go work should include race testing where
  practical. Contract changes require generation or schema-drift checks.
- If a check cannot run, say why and narrow the completion claim accordingly.

## 8. Git and Delivery Preferences

- Commit when the repository instructions say to; otherwise commit only when
  asked. Keep commits atomic and use Conventional Commits.
- Stage only files owned by the task. Preserve unrelated user and agent changes.
- Separate behavior changes, mechanical generation, and broad cleanup when that
  separation makes review materially clearer.
- Do not push, merge, release, deploy, rewrite history, or mutate shared systems
  without explicit authorization for that action.
- A clean implementation and passing local checks are not permission to publish.
