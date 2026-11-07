import { Text } from "@/components/ui/text";
import { useToast } from "@/store/toast";
import { View } from "react-native";
import Animated, { FadeIn, FadeOut, ReduceMotion } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/** iOS's stand-in for Android's toast; showToast() fills it. Above the tab bar. */
export function ToastHost() {
  const message = useToast((state) => state.message);
  const insets = useSafeAreaInsets();
  if (!message) return null;
  return (
    <Animated.View
      entering={FadeIn.duration(200).reduceMotion(ReduceMotion.System)}
      exiting={FadeOut.duration(200).reduceMotion(ReduceMotion.System)}
      pointerEvents="none"
      className="absolute inset-x-4 items-center"
      style={{ bottom: insets.bottom + 72 }}
    >
      <View className="rounded-full bg-foreground px-4 py-2.5">
        <Text className="text-sm text-background">{message}</Text>
      </View>
    </Animated.View>
  );
}
