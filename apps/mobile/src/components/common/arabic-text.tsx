import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { usePreferences } from "@/store/preferences";
import type { ComponentProps } from "react";

/**
 * Arabic source text: right to left, large, with a line height of `leading`
 * times the font size (twice by default) so stacked harakat don't collide.
 * Reading text (ayat, hadith) passes 2.25. The reader's Arabic size setting
 * scales `size`.
 */
export function ArabicText({
  className,
  leading = 2,
  size = 28,
  style,
  ...props
}: ComponentProps<typeof Text> & { leading?: number; size?: number }) {
  const scale = usePreferences((state) => state.arabicScale);
  const fontSize = size * scale;

  return (
    <Text
      className={cn("text-right", className)}
      style={[
        { fontSize, lineHeight: fontSize * leading, writingDirection: "rtl" },
        style,
      ]}
      {...props}
    />
  );
}
