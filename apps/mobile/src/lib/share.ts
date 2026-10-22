import { absoluteUrl, shareText } from "@jadwal-sholat/core/share";
import * as Clipboard from "expo-clipboard";
import { Share, ToastAndroid } from "react-native";

/**
 * Opens the system share sheet with the text and a link to the website, so
 * people without the app can still open it.
 */
export async function shareLink({
  title,
  excerpt,
  path,
}: {
  title: string;
  excerpt?: string;
  path: string;
}) {
  try {
    await Share.share({
      message: `${shareText(title, excerpt)}\n${absoluteUrl(path)}`,
      title,
    });
  } catch {
    // The reader closed the sheet or no app can receive text.
  }
}

export async function copyText(text: string, message = "Disalin") {
  await Clipboard.setStringAsync(text);
  ToastAndroid.show(message, ToastAndroid.SHORT);
}
