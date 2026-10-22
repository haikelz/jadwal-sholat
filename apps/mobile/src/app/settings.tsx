import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Text } from "@/components/ui/text";
import { usePreferences, type ThemePreference } from "@/store/preferences";
import { ScrollView, View } from "react-native";

const THEMES: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "Ikuti sistem" },
  { value: "light", label: "Terang" },
  { value: "dark", label: "Gelap" },
];

export default function SettingsScreen() {
  const theme = usePreferences((state) => state.theme);
  const setTheme = usePreferences((state) => state.setTheme);

  return (
    <ScrollView contentContainerClassName="gap-8 p-4 pb-10">
      <View className="gap-3">
        <Text variant="large" accessibilityRole="header">
          Tema
        </Text>
        <RadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value as ThemePreference)}
          className="gap-3"
        >
          {THEMES.map((option) => (
            <View key={option.value} className="flex-row items-center gap-3">
              <RadioGroupItem
                value={option.value}
                id={`theme-${option.value}`}
                accessibilityLabel={option.label}
              />
              <Label
                htmlFor={`theme-${option.value}`}
                onPress={() => setTheme(option.value)}
              >
                {option.label}
              </Label>
            </View>
          ))}
        </RadioGroup>
      </View>
    </ScrollView>
  );
}
