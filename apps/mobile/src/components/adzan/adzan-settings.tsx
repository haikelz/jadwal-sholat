import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import {
  ensureAdzanChannels,
  scheduleTestAdzan,
  syncAdzanNotifications,
} from "@/lib/adzan/notifications";
import { usePreferences } from "@/store/preferences";
import { PRAYERS, type PrayerKey } from "@jadwal-sholat/core/prayer";
import * as IntentLauncher from "expo-intent-launcher";
import * as Notifications from "expo-notifications";
import { AlarmClock, BatteryWarning, BellOff, BellRing } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { AppState, Linking, ToastAndroid, View } from "react-native";

type Access = { notifications: boolean; exactAlarm: boolean };

/**
 * Notification and exact-alarm access, re-read when the reader comes back
 * from Android's settings.
 */
function useAccess() {
  const [access, setAccess] = useState<Access | null>(null);

  const refresh = useCallback(async () => {
    const [notifications, exactAlarm] = await Promise.all([
      Notifications.getPermissionsAsync(),
      // Rejects where the platform has no such permission; treat as granted.
      Notifications.getExactAlarmPermissionsAsync().catch(() => ({ granted: true })),
    ]);
    setAccess({
      exactAlarm: exactAlarm.granted,
      notifications: notifications.granted,
    });
  }, []);

  useEffect(() => {
    refresh();
    const subscription = AppState.addEventListener("change", (status) => {
      if (status === "active") refresh();
    });
    return () => subscription.remove();
  }, [refresh]);

  return [access, refresh] as const;
}

function SwitchRow({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <View className="flex-row items-center justify-between gap-4">
      <View className="min-w-0 flex-1 gap-0.5">
        <Label onPress={() => onCheckedChange(!checked)}>{label}</Label>
        {description ? (
          <Text className="text-xs text-muted-foreground">{description}</Text>
        ) : null}
      </View>
      <Switch
        accessibilityLabel={label}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </View>
  );
}

/** The adzan section of the settings screen. */
export function AdzanSettings() {
  const enabled = usePreferences((state) => state.adzanEnabled);
  const prayers = usePreferences((state) => state.adzanPrayers);
  const setEnabled = usePreferences((state) => state.setAdzanEnabled);
  const setPrayers = usePreferences((state) => state.setAdzanPrayers);
  const [access, refreshAccess] = useAccess();
  const [denied, setDenied] = useState(false);

  async function toggleAdzan(checked: boolean) {
    if (!checked) {
      setEnabled(false);
      return;
    }
    // The channels must exist before Android 13+ shows the permission prompt.
    await ensureAdzanChannels();
    const { granted } = await Notifications.requestPermissionsAsync();
    setDenied(!granted);
    setEnabled(granted);
    refreshAccess();
  }

  function togglePrayer(key: PrayerKey, checked: boolean) {
    setPrayers(
      checked
        ? PRAYERS.map((prayer) => prayer.key).filter(
            (prayerKey) => prayerKey === key || prayers.includes(prayerKey),
          )
        : prayers.filter((prayerKey) => prayerKey !== key),
    );
  }

  async function allowExactAlarm() {
    try {
      await Notifications.requestExactAlarmPermissionsAsync();
    } catch {
      // The build doesn't declare SCHEDULE_EXACT_ALARM (Expo Go): nothing to ask.
    }
    await refreshAccess();
    // Alarms scheduled without the permission stay inexact until rescheduled.
    syncAdzanNotifications().catch(() => {});
  }

  function openBatterySettings() {
    IntentLauncher.startActivityAsync(
      IntentLauncher.ActivityAction.IGNORE_BATTERY_OPTIMIZATION_SETTINGS,
    ).catch(() => Linking.openSettings());
  }

  async function testAdzan() {
    await scheduleTestAdzan();
    ToastAndroid.show("Adzan berbunyi dalam 1 menit", ToastAndroid.SHORT);
  }

  // Shown after a denied request, or when access was revoked in Android's
  // settings; it clears once the reader allows notifications there.
  const isBlocked = access?.notifications === false && (denied || enabled);

  return (
    <View className="gap-4">
      <View className="gap-1">
        <Text variant="large" accessibilityRole="header">
          Adzan
        </Text>
        <Text variant="muted">
          Notifikasi dengan suara adzan saat masuk waktu sholat.
        </Text>
      </View>

      <SwitchRow
        label="Aktifkan adzan"
        checked={enabled && !isBlocked}
        onCheckedChange={toggleAdzan}
      />

      {isBlocked ? (
        <Alert variant="destructive" icon={BellOff}>
          <AlertTitle>Notifikasi diblokir</AlertTitle>
          <AlertDescription>
            Izinkan notifikasi untuk Jadwal Sholat di pengaturan Android.
          </AlertDescription>
          <Button
            variant="outline"
            size="sm"
            className="mb-1.5 ml-6 self-start"
            onPress={() => Linking.openSettings()}
          >
            <Text>Buka pengaturan</Text>
          </Button>
        </Alert>
      ) : null}

      {enabled && !isBlocked ? (
        <>
          <Separator />

          <View className="gap-3">
            <Text className="text-sm font-medium">Sholat</Text>
            {PRAYERS.map((prayer) => (
              <SwitchRow
                key={prayer.key}
                label={prayer.name}
                description={prayer.key === "Fajr" ? "Dengan adzan Subuh" : undefined}
                checked={prayers.includes(prayer.key)}
                onCheckedChange={(checked) => togglePrayer(prayer.key, checked)}
              />
            ))}
          </View>

          <Separator />

          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <Icon as={AlarmClock} size={16} />
              <Text className="text-sm font-medium">Ketepatan waktu</Text>
            </View>
            <Text variant="muted">
              {access?.exactAlarm === false
                ? "Bisa terlambat beberapa menit. Izinkan alarm tepat waktu agar adzan berbunyi pas."
                : "Tepat waktu."}
            </Text>
            {access?.exactAlarm === false ? (
              <Button variant="outline" size="sm" className="self-start" onPress={allowExactAlarm}>
                <Text>Izinkan alarm tepat waktu</Text>
              </Button>
            ) : null}
          </View>

          <Alert icon={BatteryWarning}>
            <AlertTitle>Adzan tidak berbunyi?</AlertTitle>
            <AlertDescription>
              Di HP Xiaomi, Oppo, atau Vivo, keluarkan Jadwal Sholat dari
              penghematan baterai agar adzan tidak tertahan.
            </AlertDescription>
            <Button
              variant="outline"
              size="sm"
              className="mb-1.5 ml-6 self-start"
              onPress={openBatterySettings}
            >
              <Text>Buka pengaturan baterai</Text>
            </Button>
          </Alert>

          {__DEV__ ? (
            <Button variant="secondary" size="sm" className="self-start" onPress={testAdzan}>
              <Icon as={BellRing} />
              <Text>Tes adzan dalam 1 menit</Text>
            </Button>
          ) : null}
        </>
      ) : null}
    </View>
  );
}
