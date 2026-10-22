// Reader display preferences, kept per device. Each one is a data attribute
// on <html> that globals.css turns into a font size.

export type DisplaySetting = "text-size" | "arabic-size";

export type DisplaySize = "normal" | "large" | "xlarge";

export const DISPLAY_SIZES: { value: DisplaySize; label: string }[] = [
  { value: "normal", label: "Standar" },
  { value: "large", label: "Besar" },
  { value: "xlarge", label: "Sangat besar" },
];

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
    // Blocked storage: the size still applies until the tab closes.
  }
}

/** Inlined in <head>, so a saved size applies before the first paint. */
export const DISPLAY_SETTINGS_SCRIPT = `(function(){try{var r=document.documentElement;["text-size","arabic-size"].forEach(function(k){var v=localStorage.getItem(k);if(v==="large"||v==="xlarge")r.setAttribute("data-"+k,v)})}catch(e){}})()`;
