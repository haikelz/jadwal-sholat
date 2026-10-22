import { queryKeys } from "@jadwal-sholat/core/api";
import { nextAudioStep, qoriOptions } from "@jadwal-sholat/core/quran";
import type { SurahDetail } from "@jadwal-sholat/core/schemas";
import {
  createAudioPlayer,
  setAudioModeAsync,
  type AudioPlayer,
} from "expo-audio";
import { create } from "zustand";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/query-client";

type AyahPlayerState = {
  /** Surah of the queued ayah, or null when stopped. */
  surah: number | null;
  /** Zero-based index of the queued ayah within `surah`. */
  index: number | null;
  playing: boolean;
  /** Bumps each time autoplay moves on, so the screen can scroll along. */
  autoplayTick: number;
};

const STOPPED = { index: null, playing: false, surah: null };

/** What the single ayah player is doing; screens read this to highlight. */
export const useAyahPlayer = create<AyahPlayerState>(() => ({
  ...STOPPED,
  autoplayTick: 0,
}));

type Queue = { surah: SurahDetail; qori: number };

// One player for the whole app: ayahs play one after another, never together.
let player: AudioPlayer | null = null;
let queue: Queue | null = null;
let lockScreenActive = false;

function getPlayer() {
  if (player) return player;

  // Keep reciting with the screen off; `doNotMix` is also what lets the
  // lock screen controls attach to this player.
  setAudioModeAsync({
    interruptionMode: "doNotMix",
    playsInSilentMode: true,
    shouldPlayInBackground: true,
  }).catch(() => {});

  player = createAudioPlayer(null);
  player.addListener("playbackStatusUpdate", (status) => {
    if (status.didJustFinish) {
      void advance();
      return;
    }
    if (useAyahPlayer.getState().playing !== status.playing) {
      useAyahPlayer.setState({ playing: status.playing });
    }
  });
  return player;
}

function lockScreenMetadata({ qori, surah }: Queue, index: number) {
  return {
    albumTitle: "Al-Qur'an",
    artist: qoriOptions.find((option) => option.id === qori)?.name,
    title: `QS. ${surah.asma.id.short}: ${surah.ayahs[index].number.insurah}`,
  };
}

function start(next: Queue, index: number, autoplay: boolean) {
  const audio = getPlayer();
  queue = next;
  audio.replace(next.surah.ayahs[index].audio.url);
  audio.play();

  const metadata = lockScreenMetadata(next, index);
  if (lockScreenActive) {
    audio.updateLockScreenMetadata(metadata);
  } else {
    // Android needs the media notification for playback past ~3 minutes in
    // the background.
    audio.setActiveForLockScreen(true, metadata);
    lockScreenActive = true;
  }

  useAyahPlayer.setState((state) => ({
    autoplayTick: autoplay ? state.autoplayTick + 1 : state.autoplayTick,
    index,
    playing: true,
    surah: next.surah.number,
  }));
}

/** Plays the next ayah, then the next surah, and stops after An-Nas. */
async function advance() {
  const current = queue;
  const { index } = useAyahPlayer.getState();
  if (!current || index === null) return;

  const step = nextAudioStep(
    { index, surah: current.surah.number },
    current.surah.ayahs.length,
  );
  if (step.type === "end") {
    stopAyahs();
    return;
  }
  if (step.type === "ayah") {
    start(current, step.position.index, true);
    return;
  }

  try {
    const nextSurah = step.position.surah;
    const surah = await queryClient.fetchQuery({
      queryKey: queryKeys.surah(nextSurah, current.qori),
      queryFn: ({ signal }) => api.surah(nextSurah, current.qori, signal),
    });
    // The reader stopped or picked another ayah while the surah loaded.
    if (queue !== current) return;
    start({ qori: current.qori, surah }, 0, true);
  } catch {
    stopAyahs();
  }
}

export function playAyah(surah: SurahDetail, index: number, qori: number) {
  start({ qori, surah }, index, false);
}

export function pauseAyah() {
  player?.pause();
}

export function resumeAyah() {
  player?.play();
}

export function stopAyahs() {
  queue = null;
  if (player) {
    player.pause();
    if (lockScreenActive) player.setActiveForLockScreen(false);
  }
  lockScreenActive = false;
  useAyahPlayer.setState(STOPPED);
}

/** Stops playback if it belongs to `surah`; called when its screen closes. */
export function stopIfPlaying(surah: number) {
  if (useAyahPlayer.getState().surah === surah) stopAyahs();
}
