export const LAST_SURAH = 114;

export type AudioPosition = {
  surah: number;
  /** Zero-based ayah index within the surah. */
  index: number;
};

export type AudioNextStep =
  | { type: "ayah"; position: AudioPosition }
  | { type: "surah"; position: AudioPosition }
  | { type: "end" };

/**
 * What plays after the current ayah: the next ayah, the first ayah of the
 * next surah (autoplay continues across surahs), or nothing after An-Nas.
 */
export function nextAudioStep(
  current: AudioPosition,
  ayahCount: number,
): AudioNextStep {
  if (current.index + 1 < ayahCount) {
    return {
      position: { index: current.index + 1, surah: current.surah },
      type: "ayah",
    };
  }
  if (current.surah >= LAST_SURAH) return { type: "end" };

  return { position: { index: 0, surah: current.surah + 1 }, type: "surah" };
}
