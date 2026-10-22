import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Link } from "expo-router";
import { Settings } from "lucide-react-native";

export function SettingsButton() {
  return (
    <Link href="/settings" asChild>
      <Button
        variant="ghost"
        size="icon"
        accessibilityLabel="Pengaturan"
        className="mr-2"
      >
        <Icon as={Settings} size={20} />
      </Button>
    </Link>
  );
}
