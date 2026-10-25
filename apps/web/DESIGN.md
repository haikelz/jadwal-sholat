# Design

Design system: ReUI (from scratch), on shadcn/ui `radix-nova`, Tailwind CSS v4, Geist for interface text (Google Fonts), LPMQ Isep Misbah for Arabic (`public/fonts`), and Lucide icons.

Direction: a calm companion app for every age, from children learning to read the Qur'an to grandparents checking the next prayer. Plain type leads; a `Frame` wraps only data grids; reading pages have no frames.

## Token source

`src/styles/global.css`, in `:root` and `.dark`. The Android app mirrors the same values in `apps/mobile/src/global.css` and `apps/mobile/src/lib/theme.ts`; change all three together.

## All-ages profile

These are deliberate deviations from the ReUI guideline (`.agents/guidelines/design-system.md`):

| Guideline | This site | Why |
| --- | --- | --- |
| Root font size stays at the browser default | `html` is 112.5%, or 125% and 140% from the display settings | `text-sm` body copy renders at about 16px and every rem-based control grows with it. The percentage multiplies the browser's own setting, so a reader's browser size still counts. |
| `text-xs` for meta | `text-xs` only for meta labels (surah details, nav labels, the ayah number); prayer names and help text use `text-sm` | At 112.5% `text-xs` is 13.5px: fine for a label, small for something you must read. |
| Icon buttons with a tooltip | An icon plus a word ("Putar", "Bagikan", "Salin", "Tandai") | Many older and younger readers can't tell what an icon does, and tooltips need a mouse. |
| `size="sm"` for compact actions | Default size for every action | Bigger targets and type. |
| Toasts at the sonner default (4 s) | 6 s | Slower readers can finish them. |

The rest follows the guideline as written:

- `--muted-foreground` is `oklch(0.521 0 0)` (#696969, AA on small text).
- `--ring` uses the primary values, so the 50% focus ring stays above 3:1.
- On touch screens a zero-specificity `::after` gives buttons, toggles and select triggers a 44px hit area. It lives in `globals.css`, so no installed component is edited.

## Display settings

The "Tampilan" button in the top bar opens a dialog with theme, text size and Arabic size (`src/components/common/display-settings.tsx`). The sizes are stored in `localStorage` (`text-size`, `arabic-size`) and applied as `data-text-size` and `data-arabic-size` on `<html>` by an inline `<head>` script before the first paint, and again after every client-router navigation (`src/lib/utils/display-settings.ts`). The theme uses the same script and the `theme` key next-themes used, so readers keep their choice.

## Arabic text

Use `arabic-font` with `lang="ar"` and `dir="rtl"`. Set the size with `[--arabic-size:<rem>]` (responsive variants work, e.g. `sm:[--arabic-size:2.25rem]`), never a `text-*` class: `.arabic-font` multiplies that size by the reader's Arabic size setting and sets the line height to 2. Reading text (ayat, hadith) raises it with `[--arabic-leading:2.25]`, and its translation, Latin and tafsir prose use `leading-[1.75]`.

## Writing

Indonesian, sentence case, plain words. Jargon gets its meaning beside it, e.g. "Penjelasan (tafsir)"; well-known controls such as the qori picker need no visible label. Say what a permission is for before the browser asks.
