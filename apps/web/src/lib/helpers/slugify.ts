/**
 * A helper function for slugify a string
 * Example: Jadwal Sholat => /jadwal-sholat
 * @param name
 * @returns {string} matched name
 */
export function slugify(name: string): string {
  const matchName: string | undefined = name
    .toLowerCase()
    .match(/[A-Za-z0-9 ]/gi)
    ?.join("")
    .replace(" ", "-");

  return matchName === "sholat" ? "/jadwal-sholat" : "/" + matchName;
}
