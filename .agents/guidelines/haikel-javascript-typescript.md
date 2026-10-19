# Haikel JavaScript and TypeScript Engineering Profile

This profile records the owner's demonstrated JavaScript and TypeScript working
style. Precedence follows `general.md` §2; this profile wins over the
JavaScript/TypeScript base and framework guides.

The goal is code that is deliberate, consistently formatted, type-safe at
boundaries, and easy to trace from a route or component to its owning behavior.

## 1. Non-Negotiable Quality Bar

- The agent MUST make the smallest complete change. Do not add compatibility
  layers, generic helpers, or dependencies without a current need.
- A change MUST have obvious ownership, input, output, error behavior, and side
  effects. Prefer straightforward code over compressed or clever code.
- Preserve stable contracts and repository conventions. Improve a weak legacy
  pattern only in the changed area and only when it does not expand scope.
- Formatting is part of correctness. Use the repository formatter; never make
  hand-aligned whitespace edits that fight it.
- Formatting alone is not enough. Use intentional blank lines to expose the
  phases of a function instead of presenting correct code as one dense block.
- A file MUST have one clear responsibility. Keep route composition, UI,
  validation, remote data, and transport concerns at their natural boundaries.
- Comments MUST explain a constraint or decision that code cannot state. Remove
  stale comments, never narrate what the next line does, and never leave
  commented-out implementation code.

## 2. Format, Imports, and Naming

The repository formatter configuration is authoritative. The owner's default for
new projects is Prettier with 2-space indentation, 80-column wrapping, double
quotes, semicolons, and `trailingComma: "all"`, which adds trailing commas to
multiline parameters and call arguments as well as arrays, objects, imports, and
exports. Older Biome projects that use `es5` trailing commas keep their setting,
and Astro repositories keep Biome at 100 columns (see `astro.md`).

```ts
export async function updateOrder(
  orderId: number,
  input: UpdateOrderInput,
): Promise<Order> {
  return orderSchema.parse(
    unwrapResponse(
      await request(`/api/orders/${orderId}`, {
        body: input,
        method: "PATCH",
      }),
    ),
  );
}
```

### Visual rhythm and semantic spacing

The owner prefers clean, spacious code whose execution phases are visible at a
glance. The formatter remains authoritative for indentation and wrapping, but
semantic blank lines remain an engineering decision.

- Separate authentication, parsing, normalization, validation, remote calls,
  error translation, state transformation, and response construction when they
  are distinct phases.
- Keep an awaited operation next to its error handling. Add breathing room after
  that block before starting the next concern.
- Write consecutive guard clauses as one block with no blank lines between them,
  then one blank line before the main path. A short single-statement guard MAY
  sit on one line without braces; use braces once the body wraps or has more
  than one statement.
- Separate derived data from side effects and separate side effects from the
  final returned value or rendered branch.
- In React components, group code in this order: props and context, refs and
  local state, form, queries and mutations, effects, render guards, handlers,
  derived render values, then `return`. Keep related hooks together and do not
  interleave unrelated state, transformations, and side effects.
- Keep JSX free of blank lines. Sibling elements stay adjacent; the blank line
  belongs before `return (`, not inside the markup.
- In services and route handlers, use the same visible sequence as the backend:
  read input, validate, authorize, execute, translate the result, return.
- In tests, group arrange, act, and assert sections with one blank line between
  them when the test contains more than a trivial assertion.
- Expand object literals, function calls, conditionals, JSX props, and callback
  bodies when they contain several meaningful values or hide ownership in a
  one-line form. Prefer one property or logical argument per line in the expanded
  form.
- Alphabetize JSX props and object-literal keys when their order carries no
  meaning. Spread props such as `{...form.register("name")}` go last.
- Keep a concise expression on one line only when it remains immediately obvious
  in context. Do not optimize source for minimum line count.
- Use one blank line per semantic boundary. Avoid repeated blank lines, blank
  lines immediately inside braces, and whitespace that splits one operation
  from its directly associated error handling.

Preferred guard rhythm:

```ts
function handleSubmit(values: PaymentFormValues) {
  if (!orderId) return;
  if (values.amount <= 0) {
    toast.error("Amount must be greater than 0.");
    return;
  }

  createPayment.mutate(
    { amount: values.amount, orderId },
    {
      onError: (error) => {
        toast.error(
          error instanceof Error ? error.message : "Unable to save payment.",
        );
      },
      onSuccess: () => {
        toast.success("Payment saved.");
        onOpenChange(false);
      },
    },
  );
}
```

For broad cleanup, inventory and inspect every handwritten JavaScript,
TypeScript, and component file in the declared scope after the formatter runs.
Include routes, services, components, hooks, schemas, and tests; exclude generated
files explicitly. A clean formatter result does not by itself prove that the
code has the intended visual rhythm.

- Use `kebab-case` filenames, `PascalCase` component/type/class names, and
  `camelCase` values, functions, hooks, and handlers. Name module constants in
  `UPPER_SNAKE_CASE`.
- Name component files entity-first: `<entity>-form.tsx`,
  `<entity>-form-dialog.tsx`, `<entity>-status-dialog.tsx`, `<entity>-table.tsx`,
  `<entity>-detail-actions.tsx`. Do not use verb-first names such as
  `dialog-create-<entity>.tsx`.
- Use a specific noun or verb. Avoid vague names such as `data`, `item`,
  `helper`, and `manager` when the domain supplies a better name.
- Keep imports in one mechanically sorted block unless the formatter establishes
  groups. The order is application-alias imports, third-party package imports,
  then neighboring relative imports. Use the repository alias for cross-feature
  application imports and relative imports for neighboring files.
- Use `import type` for type-only imports when supported by the project's module
  configuration.
- Declare components, hooks, services, and in-component handlers as named
  `function` declarations (`function handleSubmit()`). Use arrow functions for
  inline callbacks, option objects such as `onSuccess`, lexical `this`, atoms, and
  APIs such as `memo` that take an expression. React 19 passes `ref` as a
  prop, so do not add `forwardRef`.
- Route and framework special files default-export because the framework
  requires it. Every other module uses named exports.

```ts
import { useCreatePayment } from "@/hooks/payment";
import {
  paymentFormSchema,
  type PaymentFormValues,
} from "@/lib/schemas/payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PaymentSummary } from "./payment-summary";
```

## 3. Type Boundaries and Data Contracts

- TypeScript MUST be the default for application code in a TypeScript project.
- Enable and preserve strict compiler settings. Never weaken compiler options or
  introduce `any` to silence an error.
- Use `type` aliases for object shapes, unions, and props. Do not introduce
  `interface` unless a library requires declaration merging.
- Treat network responses, route input, browser storage, environment values, and
  persisted JSON as `unknown` until runtime validation proves their shape.
- Give service functions typed request and response contracts. Export named
  domain types when a shape crosses a module boundary. Do not accept
  `body: unknown` in a service when a schema already infers the input type.
- Name a Zod schema `<name>Schema` and export its type after one blank line:
  `type <Name> = z.infer<typeof <name>Schema>`. Name list schemas
  `<name>ListSchema = z.array(<entry>Schema)`. Keep the schema in
  `lib/schemas/<resource>.ts`; do not duplicate the shape in `types/`.
- With Zod 4, use top-level formats such as `z.email("...")` and pass the
  user-facing message as an argument.
- Derive a union from a const tuple instead of repeating literals.
- Use `undefined` for absence and `null` only when a contract intentionally
  represents an explicit empty value. Do not blur the two states.
- A cast must follow runtime validation or a documented invariant. Non-null
  assertions are not a substitute for control flow.

```ts
export const ORDER_STATUSES = ["draft", "paid", "cancelled"] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const orderSchema = z.object({
  id: z.number(),
  status: z.enum(ORDER_STATUSES),
  total: z.number(),
});

export type Order = z.infer<typeof orderSchema>;

export const orderListSchema = z.array(orderSchema);
```

## 4. Next.js and React Structure

- Keep App Router `page.tsx` files thin: metadata, layout composition, feature
  entry point, and only the `Suspense` boundary the route requires.
- Feature components own feature composition. Place feature pages, tables,
  dialogs, forms, detail views, and charts under
  `components/<area>/<feature>/`. Reusable primitives live in the shared UI area;
  do not duplicate an existing primitive for cosmetic reasons.
- Add `"use client"` only when hooks, browser APIs, interactive event handlers,
  Jotai, or React Query require it. Keep data-independent layout server-rendered.
- Prefer local `useState` for ephemeral local state, URL state for shareable
  filters and pagination, Jotai for cross-component client UI state, and React
  Query for remote/server state. Do not mirror fetched data into Jotai.
- Use `nuqs` for typed, shareable query-string state when it is already part of
  the application. Keep defaults and parsing explicit, and reset pagination when
  a filter changes the result set.
- Create one `QueryClient` per provider lifetime with
  `useState(() => new QueryClient(...))`.
- Use the application's component library (HeroUI, shadcn, or similar) and its
  semantic tokens. Use an existing `cn` helper for conditional classes when the
  repository has one; do not add one for a single conditional class. Do not add
  CSS-in-JS or CSS modules to a Tailwind-based application without a technical
  need.

Declare props as a named `readonly` type directly above the component and
destructure them in the signature, with defaults there. Render optional JSX
with `condition ? <Element /> : null`, not `condition && <Element />`.

```tsx
type OrderDialogProps = {
  readonly confirmLabel?: string;
  readonly isOpen: boolean;
  readonly onOpenChange: (isOpen: boolean) => void;
};

export function OrderDialog({
  confirmLabel = "Save",
  isOpen,
  onOpenChange,
}: OrderDialogProps) {
  const { data: order, error } = useOrder();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      {error ? <ErrorMessage>{error.message}</ErrorMessage> : null}
      {order ? <OrderSummary order={order} /> : null}
      <Button type="submit">{confirmLabel}</Button>
    </Modal>
  );
}
```

### Forms

- Build forms as
  `const form = useForm<Values>({ defaultValues, resolver: zodResolver(schema) })`
  and access state through `form.` instead of destructuring it.
- Mark fields invalid with `isInvalid={Boolean(form.formState.errors.name)}` or
  the library's equivalent.
- Report submit failures with `form.setError("root", { message })` and render
  that message in an `aria-live` region.
- Keep schema definitions in `lib/schemas/` when they are reusable.

Preferred ownership for a substantial feature:

```text
src/
├── app/<route>/page.tsx
├── components/<area>/<feature>/
│   ├── <feature>-page.tsx
│   ├── <feature>-table.tsx
│   ├── <feature>-form.tsx
│   └── <feature>-form-dialog.tsx
├── hooks/<feature>.ts
├── lib/schemas/<feature>.ts
└── services/<feature>.ts
```

Keep `types/` for cross-cutting types only. Do not create every file in this
example preemptively. Add a file only when that responsibility exists, and keep
route-private code near the route when it is not shared by the broader feature.

## 5. Remote Data and Mutations

HTTP access belongs in a typed service layer, never inside a component body.
Route every call through one shared `request()` client that owns headers,
credentials, idempotency keys, and error translation, and that throws one typed
error class carrying `status`. Service functions stay thin: call `request()`,
unwrap the envelope, parse with the schema. Do not put `try/catch` in each
service.

```ts
export async function getOrder(orderId: number): Promise<Order> {
  return orderSchema.parse(
    unwrapResponse(await request(`/api/orders/${orderId}`)),
  );
}
```

- Service functions MUST accept typed input, call their dedicated endpoint, and
  return parsed domain data rather than a transport response.
- Components MUST NOT know transport nesting or HTTP client error shapes.
- Put each resource's React Query hooks in `hooks/<resource>.ts`, mirroring
  `services/<resource>.ts`. Name them `useOrder`, `useOrders`, `useCreateOrder`,
  `useUpdateOrder`. Do not call `useQuery` inline in components.
- Build query keys from a shared root, then the resource, then qualifiers. Use a
  small `as const` key function when several hooks share a key.
- The mutation hook owns cache invalidation. Invalidate by the narrowest prefix
  the mutation affects; never call `invalidateQueries()` without a key.
- The component owns user feedback, through `mutate(vars, { onError, onSuccess })`
  or `try { await mutateAsync(vars) } catch`.
- Map an unknown error to UI text with
  `error instanceof Error ? error.message : "<specific fallback>"`.
- Use `placeholderData: keepPreviousData` for paginated views where retaining
  the previous page avoids disruptive UI jumps.

```ts
function orderKey() {
  return ["backend", "orders"] as const;
}

export function useOrders(filters: OrderFilters) {
  return useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => listOrders(filters),
    queryKey: [...orderKey(), "list", filters],
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKey() });
    },
  });
}
```

## 6. API and Backend TypeScript Style

For NestJS services, use a controller → service → persistence/model flow.

- Controllers own decorators, authentication metadata, request extraction,
  Swagger documentation, and response-envelope mapping (`return { data }`).
- Services own business rules, authorization decisions, Prisma access, safe field
  selection, and domain response construction.
- DTOs MUST define the request/response contract, carry API documentation
  metadata where the project uses Swagger, and be validated at the boundary.
  A DTO class with documentation but no validation is not a contract.
- Validate untrusted inputs once at the application boundary. Do not validate
  scattered fragments of the same payload in multiple layers.
- Known business failures SHOULD use an explicit HTTP/domain error. A global
  error filter normalizes it; controllers MUST NOT manually serialize every
  failure.
- Prisma queries that return user records MUST select safe fields deliberately.
  Never leak credentials by spreading a persistence record into a response.

## 7. Errors, Observability, and Security

- Catch errors only to recover, translate, clean up, or report at an owned
  boundary. Rethrow unknown failures unchanged after safe narrowing.
- Never branch on human-readable error text. Use a status, code, or typed
  discriminant.
- Do not log tokens, cookies, credentials, full request objects, personal or
  medical data, or raw environment configuration.
- Public failures MUST be actionable but never expose stack traces, Prisma
  details, local paths, or third-party internals.
- Check authorization and ownership at the service boundary. An authenticated
  request is not automatically allowed to act on every resource.

## 8. Testing and Verification

- Test observable behavior and domain rules, not implementation trivia.
- Use the repository's runner. New Bun applications use `bun test` with
  `<file>.test.ts(x)` colocated beside the source, flat
  `test("<behavior sentence>", ...)` calls without `describe`, and
  `renderToStaticMarkup` for component markup. Vitest projects keep Vitest and
  React Testing Library and query elements by accessible role or text.
- Mock HTTP and external integrations at their module boundary. Do not mock the
  component or service being tested.
- Configure query-client tests with retries and background refetches disabled so
  failure behavior remains deterministic.
- Backend unit tests SHOULD construct a Nest testing module with focused
  dependency fakes and assert success plus meaningful error paths.
- Every behavior change needs focused success, invalid-input/boundary, and error
  coverage where tests exist. A defect fix SHOULD add a regression test.
- In a monorepo, keep the shared Biome configuration schema compatible with the
  installed Biome CLI major version. Validate the shared config from every app
  that extends it after an upgrade.
- Before finishing, run the formatter check, type check (`tsc --noEmit` when no
  `typecheck` script exists), lint, narrow tests, and the relevant build, then
  inspect the final diff. Use lint commands without `--fix` when checking.

## 9. Legacy Patterns to Avoid Extending

- Do not copy permissive `any`, `catch (error: any)`, disabled
  `strictNullChecks`, or disabled `noImplicitAny` because older configuration
  permits them. New code uses precise types or `unknown` at a boundary.
- Do not copy per-service `try/catch` blocks that cast transport errors; use the
  shared request client.
- Do not call `useQuery` inline in components, use query keys made only of
  page/filter values, or invalidate the whole cache after a mutation.
- Do not copy inline prop object types, `condition && <Element />` rendering, or
  verb-first component filenames from older code.
- Do not extend older schema naming such as `<name>M` or `<name>DTO` suffixes.
- Do not copy reusable-component default exports. Preserve framework-required
  route defaults.
- Do not add controller business logic, oversized catch-all services, raw
  `require` calls, duplicated middleware registration, or validation services
  that nothing calls.
- Do not treat shallow tests that only assert a provider exists as adequate
  coverage for new behavior.
