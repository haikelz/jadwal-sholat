/** "04:21 (WIB)" → "04.21", the Indonesian way of writing a time. */
export function formatSholatTime(time: string) {
  return time.slice(0, 5).replace(":", ".");
}
