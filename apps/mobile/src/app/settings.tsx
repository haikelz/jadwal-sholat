import { AdzanSettings } from "@/components/adzan/adzan-settings";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Text } from "@/components/ui/text";
import {
  usePreferences,
  type ArabicScale,
  type ThemePreference,
} from "@/store/preferences";
import { ScrollView, View } from "react-native";

const THEMES: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "Ikuti sistem" },
  { value: "light", label: "Terang" },
  { value: "dark", label: "Gelap" },
];

const ARABIC_SCALES: { value: ArabicScale; label: string }[] = [
  { value: 1, label: "Standar" },
  { value: 1.25, label: "Besar" },
  { value: 1.5, label: "Sangat besar" },
];

export default function SettingsScreen() {
  const theme = usePreferences((state) => state.theme);
  const setTheme = usePreferences((state) => state.setTheme);
  const arabicScale = usePreferences((state) => state.arabicScale);
  const setArabicScale = usePreferences((state) => state.setArabicScale);

  return (
    <ScrollView contentContainerClassName="gap-8 p-4 pb-10">
      <AdzanSettings />

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

      <View className="gap-3">
        <Text variant="large" accessibilityRole="header">
          Ukuran huruf Arab
        </Text>
        <RadioGroup
          value={String(arabicScale)}
          onValueChange={(value) => setArabicScale(Number(value) as ArabicScale)}
          className="gap-3"
        >
          {ARABIC_SCALES.map((option) => (
            <View key={option.value} className="flex-row items-center gap-3">
              <RadioGroupItem
                value={String(option.value)}
                id={`arabic-${option.value}`}
                accessibilityLabel={option.label}
              />
              <Label
                htmlFor={`arabic-${option.value}`}
                onPress={() => setArabicScale(option.value)}
              >
                {option.label}
              </Label>
            </View>
          ))}
        </RadioGroup>
        <Text variant="muted">
          Ukuran teks lainnya mengikuti pengaturan ukuran font Android.
        </Text>
      </View>
    </ScrollView>
  );
}
