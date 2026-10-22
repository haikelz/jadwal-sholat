import {
  EmptyState,
  ErrorState,
  ListSkeleton,
} from "@/components/common/state-views";
import { AudioBar } from "@/components/quran/audio-bar";
import { AyahItem } from "@/components/quran/ayah-item";
import { ReadingToolbar } from "@/components/quran/reading-toolbar";
import { SurahHeader } from "@/components/quran/surah-header";
import { SurahPager } from "@/components/quran/surah-pager";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { api } from "@/lib/api";
import {
  pauseAyah,
  playAyah,
  resumeAyah,
  stopAyahs,
  stopIfPlaying,
  useAyahPlayer,
} from "@/lib/audio/ayah-player";
import { copyText, shareLink } from "@/lib/share";
import { useLastRead } from "@/store/last-read";
import { usePreferences } from "@/store/preferences";
import { queryKeys } from "@jadwal-sholat/core/api";
import { LAST_SURAH } from "@jadwal-sholat/core/quran";
import type { Ayah } from "@jadwal-sholat/core/schemas";
import { ayahPath, surahPath } from "@jadwal-sholat/core/share";
import { FlashList, type FlashListRef } from "@shopify/flash-list";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Stack,
  useIsFocused,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { BookX, Share2 } from "lucide-react-native";
import { useCallback, useEffect, useRef } from "react";
import { ToastAndroid, View } from "react-native";

export default function SurahScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const params = useLocalSearchParams<{ number: string; ayat?: string }>();
  const number = Number(params.number);
  const isValid = Number.isInteger(number) && number >= 1 && number <= LAST_SURAH;

  const qori = usePreferences((state) => state.qori);
  const showAudio = usePreferences((state) => state.showAudio);
  const showLatin = usePreferences((state) => state.showLatin);
  const setQori = usePreferences((state) => state.setQori);
  const setShowAudio = usePreferences((state) => state.setShowAudio);
  const setShowLatin = usePreferences((state) => state.setShowLatin);
  const lastRead = useLastRead((state) => state.lastRead);
  const setLastRead = useLastRead((state) => state.setLastRead);

  const playingSurah = useAyahPlayer((state) => state.surah);
  const playingIndex = useAyahPlayer((state) => state.index);
  const playing = useAyahPlayer((state) => state.playing);

  const listRef = useRef<FlashListRef<Ayah>>(null);

  const { data: surah, isPending, isError, refetch } = useQuery({
    enabled: isValid,
    // Switching reciter keeps the text on screen while the new audio loads.
    placeholderData: keepPreviousData,
    queryKey: queryKeys.surah(number, qori),
    queryFn: ({ signal }) => api.surah(number, qori, signal),
  });

  // A shared ayah link (?ayat=N) opens at that ayah.
  const linkedAyah = Number(params.ayat);
  const linkedIndex =
    surah && Number.isInteger(linkedAyah) && linkedAyah >= 1 && linkedAyah <= surah.ayahs.length
      ? linkedAyah - 1
      : undefined;

  const currentIndex = playingSurah === number ? playingIndex : null;
  const lastReadAyah = lastRead?.surah === number ? lastRead.ayah : null;

  // Leaving the surah stops its recitation.
  useEffect(() => () => stopIfPlaying(number), [number]);

  // Autoplay continued into the next surah: follow it once this screen is on
  // top (the tafsir sheet may be open).
  useEffect(() => {
    if (!isFocused || playingSurah !== number + 1) return;
    router.replace({
      pathname: "/quran/[number]",
      params: { number: String(playingSurah) },
    });
  }, [isFocused, number, playingSurah, router]);

  // Keep the recited ayah in view as autoplay moves on (the reader's own taps
  // don't scroll). No animation, so it stays calm for readers who reduce motion.
  useEffect(
    () =>
      useAyahPlayer.subscribe((state, previous) => {
        if (
          state.autoplayTick !== previous.autoplayTick &&
          state.surah === number &&
          state.index !== null
        ) {
          listRef.current?.scrollToIndex({ index: state.index, viewPosition: 0.1 });
        }
      }),
    [number],
  );

  const togglePlay = useCallback(
    (ayah: Ayah) => {
      if (!surah) return;
      const index = ayah.number.insurah - 1;
      if (index === currentIndex) {
        if (playing) pauseAyah();
        else resumeAyah();
        return;
      }
      playAyah(surah, index, qori);
    },
    [currentIndex, playing, qori, surah],
  );

  const share = useCallback(
    (ayah: Ayah) => {
      if (!surah) return;
      void shareLink({
        excerpt: ayah.translation.id,
        path: ayahPath(surah.number, ayah.number.insurah),
        title: `QS. ${surah.asma.id.short}: ${ayah.number.insurah}`,
      });
    },
    [surah],
  );

  const copy = useCallback(
    (ayah: Ayah) => {
      if (!surah) return;
      void copyText(
        `${ayah.text.ar}\n\n${ayah.translation.id}\n\n(QS. ${surah.asma.id.short}: ${ayah.number.insurah})`,
        "Ayat disalin",
      );
    },
    [surah],
  );

  const bookmark = useCallback(
    (ayah: Ayah) => {
      if (!surah) return;
      setLastRead({
        ayah: ayah.number.insurah,
        name: surah.asma.id.short,
        surah: surah.number,
      });
      ToastAndroid.show("Ayat ditandai sebagai bacaan terakhir", ToastAndroid.LONG);
    },
    [setLastRead, surah],
  );

  function goToSurah(target: number) {
    // Stop first: the next screen mounts before this one unmounts.
    stopAyahs();
    router.replace({ pathname: "/quran/[number]", params: { number: String(target) } });
  }

  const title = surah?.asma.id.short ?? (isValid ? `Surat ${number}` : "Al-Qur'an");

  function renderBody() {
    if (!isValid) {
      return (
        <View className="p-4">
          <EmptyState
            icon={BookX}
            title="Surat tidak ditemukan"
            description="Nomor surat hanya 1 sampai 114."
            action={
              <Button variant="outline" onPress={() => router.replace("/quran")}>
                <Text>Daftar surat</Text>
              </Button>
            }
          />
        </View>
      );
    }

    if (isPending) {
      return (
        <View className="gap-6 p-4">
          <ListSkeleton rows={1} rowClassName="h-24" label="Memuat surat…" />
          <ListSkeleton rows={4} rowClassName="h-32" label="Memuat ayat…" />
        </View>
      );
    }

    if (isError || !surah) {
      return (
        <View className="p-4">
          <ErrorState title="Surat belum dapat dimuat" onRetry={() => refetch()} />
        </View>
      );
    }

    // The audio bar is a sibling under the list, so the list ends above it
    // and the last ayah never hides behind the controls.
    return (
      <View className="flex-1">
        <FlashList
          ref={listRef}
          data={surah.ayahs}
          keyExtractor={(ayah) => String(ayah.number.insurah)}
          initialScrollIndex={linkedIndex}
          keyboardShouldPersistTaps="handled"
          extraData={{ currentIndex, lastReadAyah, linkedIndex, playing, showAudio, showLatin }}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListHeaderComponent={
            <View className="gap-4 px-4 pt-6">
              <SurahHeader surah={surah} />
              <ReadingToolbar
                ayahCount={surah.ayahCount}
                qori={qori}
                showAudio={showAudio}
                showLatin={showLatin}
                onJump={(index) => listRef.current?.scrollToIndex({ index })}
                onOpenTafsir={() =>
                  router.push({
                    pathname: "/quran/[number]/tafsir",
                    params: { number: String(surah.number) },
                  })
                }
                onQoriChange={(next) => {
                  // The new reciter refetches every ayah URL.
                  stopAyahs();
                  setQori(next);
                }}
                onShowAudioChange={(next) => {
                  if (!next) stopAyahs();
                  setShowAudio(next);
                }}
                onShowLatinChange={setShowLatin}
              />
            </View>
          }
          renderItem={({ item, index }) => (
            <AyahItem
              ayah={item}
              showAudio={showAudio}
              showLatin={showLatin}
              isPlaying={index === currentIndex && playing}
              isLastRead={item.number.insurah === lastReadAyah}
              isLinked={index === linkedIndex}
              onTogglePlay={togglePlay}
              onShare={share}
              onCopy={copy}
              onBookmark={bookmark}
            />
          )}
          ListFooterComponent={<SurahPager number={surah.number} onNavigate={goToSurah} />}
        />
        <AudioBar surah={surah} qori={qori} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title,
          headerRight: surah
            ? () => (
                <Button
                  variant="ghost"
                  accessibilityLabel={`Bagikan surat ${surah.asma.id.short}`}
                  onPress={() =>
                    void shareLink({
                      excerpt: `${surah.asma.translation.id} · ${surah.ayahCount} ayat`,
                      path: surahPath(surah.number),
                      title: `QS. ${surah.asma.id.short}`,
                    })
                  }
                >
                  <Icon as={Share2} size={18} />
                  <Text>Bagikan</Text>
                </Button>
              )
            : undefined,
        }}
      />
      {renderBody()}
    </>
  );
}
