import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { usePreferences } from "@/store/preferences";
import type { ComponentProps } from "react";

/**
 * Arabic source text: right to left, large, with a fixed line height of twice
 * the font size so stacked harakat don't collide. The reader's Arabic size
 * setting scales `size`.
 */
export function ArabicText({
  className,
  size = 28,
  style,
  ...props
}: ComponentProps<typeof Text> & { size?: number }) {
  const scale = usePreferences((state) => state.arabicScale);
  const fontSize = size * scale;

  return (
    <Text
      className={cn("text-right", className)}
      style={[
        { fontSize, lineHeight: fontSize * 2, writingDirection: "rtl" },
        style,
      ]}
      {...props}
    />
  );
}
