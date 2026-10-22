import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/**
 * Arabic source text: right to left, large, with a fixed line height of twice
 * the font size so stacked harakat don't collide.
 */
export function ArabicText({
  className,
  size = 28,
  style,
  ...props
}: ComponentProps<typeof Text> & { size?: number }) {
  return (
    <Text
      className={cn("text-right", className)}
      style={[
        { fontSize: size, lineHeight: size * 2, writingDirection: "rtl" },
        style,
      ]}
      {...props}
    />
  );
}
