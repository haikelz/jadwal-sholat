import { SettingsButton } from "@/components/common/settings-button";
import { THEME } from "@/lib/theme";
import { Tabs } from "expo-router";
import {
  BookMarked,
  Clock4,
  type LucideIcon,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";

// Same sections, order and short labels as the web's bottom bar.
const TABS: { name: string; title: string; label: string; icon: LucideIcon }[] = [
  { name: "index", title: "Jadwal Sholat", label: "Jadwal", icon: Clock4 },
  { name: "quran", title: "Al-Qur'an", label: "Qur'an", icon: BookMarked },
];

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme === "dark" ? "dark" : "light"];

  return (
    <Tabs
      screenOptions={{
        headerRight: () => <SettingsButton />,
        headerShadowVisible: false,
        headerTitleAlign: "left",
        tabBarActiveTintColor: theme.foreground,
        tabBarInactiveTintColor: theme.mutedForeground,
      }}
    >
      {TABS.map(({ name, title, label, icon: TabIcon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarLabel: label,
            tabBarIcon: ({ color, size }) => <TabIcon color={color} size={size} />,
          }}
        />
      ))}
    </Tabs>
  );
}
