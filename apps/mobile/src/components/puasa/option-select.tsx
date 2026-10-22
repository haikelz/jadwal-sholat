import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type SelectOption = { value: string; label: string };

// ponytail: shared by the Puasa and Hadith tabs; move to components/common
// if a third screen needs it.
/** A select over plain string values; the menu scrolls past a few items. */
export function OptionSelect({
  label,
  options,
  value,
  onValueChange,
  className,
}: {
  /** Accessible name and placeholder. */
  label: string;
  options: readonly SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}) {
  const insets = useSafeAreaInsets();
  // The menu matches the trigger's width.
  const [width, setWidth] = useState<number>();
  const selected = options.find((option) => option.value === value);

  return (
    <Select
      className={className}
      value={selected}
      onValueChange={(option) => {
        if (option) onValueChange(option.value);
      }}
    >
      <SelectTrigger
        accessibilityLabel={`${label}: ${selected?.label ?? "belum dipilih"}`}
        onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      >
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent
        insets={{
          bottom: insets.bottom + 24,
          left: 12,
          right: 12,
          top: insets.top,
        }}
        style={{ width }}
      >
        <ScrollView className="max-h-72">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </ScrollView>
      </SelectContent>
    </Select>
  );
}
