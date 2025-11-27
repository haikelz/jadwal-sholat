/**
 * A helper function to format sholat time
 * Only spesific case for sholat time
 * @param {string} time
 * @returns {*}
 */
export function formatSholatTime(time: string) {
  const format = time.slice(0, 5).replace(":", ".");
  return format;
}
