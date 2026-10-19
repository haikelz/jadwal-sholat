# Frontend Design System Guideline

Precedence follows `general.md` §2. This guide defines the owner's interface
system: ReUI on shadcn `base-nova`, Tailwind CSS v4, oklch tokens, and the Geist
type family. It applies to React applications (Next.js, Astro islands) and to
Svelte applications that port ReUI by hand. A project that standardizes on
another component library, such as HeroUI, follows that library instead.

Read `preferences.md` §5 for general interface quality. This file owns the
concrete system.

## 1. Foundation

- Component system: ReUI, a shadcn registry. Stock shadcn primitives cover what
  ReUI does not replace.
- Style: `base-nova` (Base UI primitives, reduced padding) for new projects.
  Keep the style an existing project already declares in `components.json`.
- Styling: Tailwind CSS v4, CSS-first configuration (`@theme inline`), no
  `tailwind.config.js` for tokens.
- Tokens: shadcn and ReUI semantic names with oklch values on a neutral base.
- Type: Geist Sans and Geist Mono.
- Icons: Lucide, unless the project already declares another icon library.
- Class utilities: `cn` from the `cn` package and `cva` in React;
  `tailwind-variants` and `cn` in Svelte.
- Motion: `tw-animate-css` for enter and exit, CSS transitions for state.

Every frontend keeps a `DESIGN.md` at its root that records the direction, the
token source, and every deliberate deviation from this guide.

## 2. ReUI Setup

Register ReUI in `components.json`:

```json
{
  "registries": {
    "@reui": "https://reui.io/r/{style}/{name}.json"
  },
  "style": "base-nova"
}
```

- Install ReUI items with `npx shadcn@latest add @reui/<name>` (for example
  `@reui/frame`, `@reui/c-alert-1`). Install stock shadcn items by bare name
  (`npx shadcn@latest add button`).
- `@reui` is a registry namespace, not an npm scope. Never run
  `npm install @reui/<name>`; it installs an unrelated package.
- Premium items use the object registry form with
  `"headers": { "Authorization": "Bearer ${REUI_LICENSE_KEY}" }`. Keep the key
  in the untracked local env file.
- Keep ReUI files in `components/reui/` and stock shadcn files in
  `components/ui/`. Feature code composes them; it does not copy them.
- Keep upstream class strings, variant names, and `data-slot` attributes when
  adapting an installed component. Put a short comment beside each deviation.
- Before building a block from scratch, search ReUI for an existing component
  or `c-*` example. The ReUI MCP server (`https://mcp.reui.io`) exposes search,
  examples, install commands, and usage validation:
  `claude mcp add --transport http reui https://mcp.reui.io`.
- Append `.md` to any reui.io docs URL to read it as Markdown.

## 3. Svelte Ports

ReUI ships React only. Svelte applications port it to Bits UI and never add a
React runtime.

Sources of truth, in order:

1. ReUI registry JSON: `https://reui.io/r/base-nova/<name>.json`.
2. shadcn `base-nova` JSON: `https://ui.shadcn.com/r/styles/base-nova/<name>.json`,
   for stock primitives.
3. The live reui.io stylesheet, for theme values.

- Start each ported file with `// Port of ReUI <Component> (base-nova)`.
- Keep the upstream class strings, variant names, sizes, and `data-slot`
  values. Deviate only for Svelte or Bits UI mechanics, with a comment.
- Express variants with `tailwind-variants` (`tv()`), mirroring the upstream
  `cva` definition key for key.

## 4. Typography

### Loading Geist

Load Geist Sans and Geist Mono once, at the root layout, and expose them as
`--font-sans` and `--font-mono`.

Next.js, with the `geist` package:

```tsx
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      lang="id"
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
```

Astro, with the Fonts API:

```ts
export default defineConfig({
  fonts: [
    {
      cssVariable: "--font-geist-sans",
      name: "Geist",
      provider: fontProviders.fontsource(),
    },
    {
      cssVariable: "--font-geist-mono",
      name: "Geist Mono",
      provider: fontProviders.fontsource(),
    },
  ],
});
```

Render `<Font cssVariable="--font-geist-sans" preload />` and the mono
equivalent from `astro:assets` in the root layout head.

SvelteKit and other Vite apps import `@fontsource-variable/geist` and
`@fontsource-variable/geist-mono` in the root stylesheet. Their families are
`"Geist Variable"` and `"Geist Mono Variable"`.

Map the loaded fonts in the global stylesheet:

```css
@theme inline {
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
}
```

Projects that still ship Inter or another sans keep it until a dedicated
migration task. Never mix two sans families in one product surface.

### Scale and usage

- Body copy in application UI is `text-sm` (14px). Metadata, captions, and
  labels are `text-xs text-muted-foreground`. Keep the root font size at the
  browser default.
- Page title: `text-xl font-semibold tracking-tight`. Section or frame title:
  `text-sm font-semibold`. Stat value:
  `text-2xl font-semibold tracking-tight tabular-nums`.
- Use weights 400, 500, and 600. Do not use 700 or heavier in application UI.
- Apply `tracking-tight` to headings, never to body text.
- Every compared number uses `tabular-nums`: tables, metrics, counters, prices,
  durations.
- Use Geist Mono for code, IDs, hashes, paths, timestamps, and compact technical
  labels. Do not set prose or headings in mono.
- Use sentence case. Do not use uppercase, letter-spaced eyebrows or kickers.
- Apply `text-wrap: pretty` to paragraphs and `text-wrap: balance` to headings.

## 5. Color Tokens

Define tokens once in the global stylesheet. Components use semantic classes
(`bg-card`, `text-muted-foreground`, `border-border`) and never hex values,
`oklch()` literals, or raw palette classes such as `bg-zinc-100`.

Core shadcn names, neutral base:

```css
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.521 0 0); /* ReUI #696969, AA on small text */
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
}
```

ReUI extended tokens, each with a `-foreground` pair, reference the Tailwind
palette so values stay exact:

| Token | Light | Light foreground | Dark foreground |
| --- | --- | --- | --- |
| `--success` | `emerald-500` | `emerald-900` | `emerald-600` |
| `--info` | `violet-500` | `violet-900` | `violet-600` |
| `--warning` | `yellow-500` | `yellow-900` | `yellow-600` |
| `--invert` | `zinc-900` | `zinc-50` | `zinc-700` base |
| `--destructive-foreground` | | `red-800` | `red-600` |

Write them as `--success: var(--color-emerald-500);`. Copy the exact set from
the installed ReUI theme when the registry provides it.

Also define `--chart-1` to `--chart-5` and the `--sidebar-*` set from the ReUI
theme.

Color meaning:

- Primary is neutral. It marks actions, focus, and selection, never data or
  health.
- Hue appears only for status and data. Never use color for decoration.
- Status uses a dot or icon plus a text label. Color alone never carries
  meaning.
- Use extended tokens only for real states. Tinted badges and alerts use the
  `-light` pattern: 10% background, matching foreground text.
- Data series read `--chart-*`, never `--primary` or status tokens.

## 6. Theme Switching

- Use the `.dark` class with `@custom-variant dark (&:is(.dark *));`.
- Default to the system preference. Persist an explicit choice in
  `localStorage` and apply it with an inline head script before first paint so
  the page never flashes. In Next.js, `next-themes` with `attribute="class"`
  and `defaultTheme="system"` does this.
- Set `color-scheme` to match the active theme.
- Offer light, dark, and system in the theme control.

## 7. Surfaces and Elevation

- In-flow surfaces are flat. Separate them with hairline borders (`border`),
  not shadows. Shadows belong to overlays: popovers, menus, dialogs, sheets,
  toasts.
- Frame and FramePanel are the primary containers for application widgets. A
  Frame is the muted, bordered surround; FramePanel is the inner card-colored
  surface with a concentric radius.
- Never place a Frame inside a FramePanel or a card inside a card.
- Use radius from the token scale (`rounded-md`, `rounded-lg`, `rounded-xl`).
  Nested radii stay concentric: inner radius equals outer radius minus the gap.
- Dense data (tables) uses the Frame `dense` option so the panel has no padding.

## 8. Layout

- Spacing follows the 4px Tailwind scale. Typical rhythm: `gap-1.5` to `gap-3`
  inside components, `gap-4` between widgets, `mb-6` under the page header.
- Application shell: a `w-64` sidebar that collapses to an icon rail on desktop
  and opens as a drawer on mobile, plus a sticky `h-12` header with the sidebar
  trigger, breadcrumb, and context controls.
- Content sits in a centered container (`mx-auto max-w-[96rem]`) with
  `px-4 lg:px-6` and safe-area insets on mobile.
- Page header: title, optional `text-sm text-muted-foreground` description, and
  actions aligned to the end.
- Dashboards use a 12-column grid that collapses to one column on small
  screens. Do not build grids of equal-weight panels with no hierarchy.
- Marketing and editorial pages may use larger type and wider measure, but keep
  the same tokens, fonts, and surface rules.
- Test at 375, 768, and 1280 pixels. No page-level horizontal scroll; wide
  tables scroll inside their own container.

## 9. Components

- Buttons: `base-nova` sizes, `h-8` default, `h-6`/`h-7`/`h-9` for xs, sm, lg.
  Destructive buttons use the tinted `bg-destructive/10 text-destructive` form.
  Mark inline icons with `data-icon="inline-start"` or `"inline-end"`.
- Badges: solid, `-light`, and `-outline` variants from ReUI.
- Tables: TanStack Table inside a dense Frame, a 36px header row, mono IDs,
  tabular numbers, and right-aligned numeric columns.
- Stat tiles: `text-xs font-medium text-muted-foreground` label, tabular value,
  optional trend badge with an arrow and screen-reader text.
- Charts: read `--chart-*` tokens, include `role="img"` and an `aria-label`
  (or SVG `title` and `desc`), and provide a visually hidden table for the same
  data. Cap donut charts at five segments.
- Empty states: icon, title, one-sentence explanation, and the next action.
  Never show fabricated data; label demo data as synthetic.
- Loading: skeletons that match the final shape. Errors: a destructive Alert
  with a retry action.
- Toasts: an Alert on an opaque popover surface.

## 10. Motion

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for enter and exit.
- Durations: 150 to 200ms for state changes, at most 300ms for entrances in
  application UI.
- Pressed buttons use `active:translate-y-px`.
- Do not slide or stagger content on page entry in application UI.
- Wrap every animation in `prefers-reduced-motion: no-preference`, or use
  `MotionConfig reducedMotion="user"` with Motion for React.

## 11. Accessibility

- Target WCAG 2.2 AA.
- Focus: a 2px outline with a 2px offset on every interactive element. If the
  `--ring` gray falls below 3:1 against the background, draw the outline with
  `--primary`.
- Touch targets reach 44px under `pointer: coarse`.
- Provide a skip link, one `h1` per page (visually hidden when a frame title is
  the visible heading), `aria-current="page"` on navigation, and `aria-hidden`
  on decorative icons.
- Preserve loading, empty, error, success, disabled, and permission-denied
  states for every data view.

## 12. Avoid

- Glow effects, gradient text, glass blur, and decorative grid or dot
  backgrounds.
- Icon-in-a-colored-square card scaffolds and repeated equal-weight feature
  grids.
- Nested cards or frames.
- Shadows on in-flow panels.
- Hex values, `oklch()` literals, or raw palette classes in components.
- Mixing two component libraries in one surface, or keeping a library while
  hand-building a conflicting visual language.
- Adding a React runtime to a Svelte application to reuse a ReUI component.

## 13. Verification

- Run the formatter, lint, type check, and build (see the language owner
  profile §8).
- Check rendered output in light and dark themes at 375, 768, and 1280 pixels,
  including empty, loading, and error states.
- Check keyboard navigation and visible focus on every changed control.
- Search the diff for hex values, `oklch(` outside the token file, and raw
  palette classes.
