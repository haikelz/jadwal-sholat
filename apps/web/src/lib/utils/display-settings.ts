// Reader display preferences, kept per device: theme, text size and Arabic
// size. Each is applied to <html> (the dark class, data-text-size,
// data-arabic-size), and globals.css turns the sizes into font sizes.

export type DisplaySetting = "text-size" | "arabic-size";

export type DisplaySize = "normal" | "large" | "xlarge";

export const DISPLAY_SIZES: { value: DisplaySize; label: string }[] = [
  { value: "normal", label: "Standar" },
  { value: "large", label: "Besar" },
  { value: "xlarge", label: "Sangat besar" },
];

declare global {
  interface Window {
    /** Defined by DISPLAY_SETTINGS_SCRIPT; re-applies every saved setting. */
    __applyDisplay?: () => void;
  }
}

export function readDisplaySize(setting: DisplaySetting): DisplaySize {
  const size = document.documentElement.getAttribute(`data-${setting}`);
  return size === "large" || size === "xlarge" ? size : "normal";
}

export function applyDisplaySize(setting: DisplaySetting, size: DisplaySize) {
  const root = document.documentElement;
  if (size === "normal") root.removeAttribute(`data-${setting}`);
  else root.setAttribute(`data-${setting}`, size);

  try {
    localStorage.setItem(setting, size);
  } catch {
    // Blocked storage: the size still applies until the next navigation.
  }
}

/**
 * Inlined in <head>, so saved settings apply before the first paint. The
 * client router swaps <html> attributes on every navigation, so it re-applies
 * after each swap, and follows the system theme while "system" is chosen.
 * The "theme" key is the one next-themes used, so saved choices carry over.
 */
export const DISPLAY_SETTINGS_SCRIPT = `(function(){var m=matchMedia("(prefers-color-scheme: dark)");function a(){var r=document.documentElement;try{var t=localStorage.getItem("theme")||"system";var d=t==="dark"||(t==="system"&&m.matches);r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";["text-size","arabic-size"].forEach(function(k){var v=localStorage.getItem(k);if(v==="large"||v==="xlarge")r.setAttribute("data-"+k,v);else r.removeAttribute("data-"+k)})}catch(e){}}a();if(!window.__applyDisplay){window.__applyDisplay=a;document.addEventListener("astro:after-swap",a);m.addEventListener("change",a)}})()`;
