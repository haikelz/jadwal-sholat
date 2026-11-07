import { AccessibilityInfo, Platform, ToastAndroid } from "react-native";
import { create } from "zustand";

/** The message ToastHost shows on iOS, which has no system toast. */
export const useToast = create<{ message: string | null }>()(() => ({ message: null }));

let hideTimer: ReturnType<typeof setTimeout> | undefined;

/** A short confirmation: Android's own toast, an in-app one on iOS. */
export function showToast(message: string) {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.LONG);
    return;
  }
  useToast.setState({ message });
  AccessibilityInfo.announceForAccessibility(message);
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => useToast.setState({ message: null }), 3500);
}
