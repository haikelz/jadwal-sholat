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
        // 40dp button + 4dp each side reaches Android's 48dp touch target.
        hitSlop={4}
        className="mr-2"
      >
        <Icon as={Settings} size={20} />
      </Button>
    </Link>
  );
}
