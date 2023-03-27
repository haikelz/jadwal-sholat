/**
 * A helper function for slugify a string
 * Example: Jadwal Sholat => /jadwal-sholat
 */
export function slugify(name: string) {
  const matchName: string | undefined = name
    .toLowerCase()
    .match(/[A-Za-z0-9 ]/gi)
    ?.join("")
    .replace(" ", "-");
  return matchName === "sholat" ? "/jadwal-sholat" : "/" + matchName;
}
