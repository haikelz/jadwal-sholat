import { describe, expect, test } from "bun:test";
import { surahDetailSchema, surahListItemSchema } from "../schemas/quran";
import { nextAudioStep } from "./audio-queue";
import { splitHighlight } from "./highlight";

describe("surah schemas", () => {
  test("the list item drops fields a row never renders", () => {
    const item = surahListItemSchema.parse({
      asma: { id: { short: "Al-Fatihah" }, translation: { id: "Pembukaan" } },
      ayahCount: 7,
      number: 1,
      recitation: { full: "https://…" },
      tafsir: { id: "long text" },
      type: { id: "Makkiyyah" },
    });

    expect(Object.keys(item).sort()).toEqual(["asma", "ayahCount", "number", "type"]);
  });

  test("strips the byte-order mark from Arabic text", () => {
    const ayah = surahDetailSchema.shape.ayahs.element.parse({
      audio: { url: "https://…" },
      number: { inquran: 1, insurah: 1 },
      text: { ar: "﻿بِسْمِ", read: "Bismi" },
      translation: { id: "Dengan nama" },
    });

    expect(ayah.text.ar).toBe("بِسْمِ");
  });
});

describe("nextAudioStep", () => {
  test("moves to the next ayah, then the next surah, then stops", () => {
    expect(nextAudioStep({ index: 0, surah: 1 }, 7)).toEqual({
      position: { index: 1, surah: 1 },
      type: "ayah",
    });
    expect(nextAudioStep({ index: 6, surah: 1 }, 7)).toEqual({
      position: { index: 0, surah: 2 },
      type: "surah",
    });
    expect(nextAudioStep({ index: 5, surah: 114 }, 6)).toEqual({ type: "end" });
  });
});

describe("splitHighlight", () => {
  test("marks case-insensitive matches and keeps the rest", () => {
    expect(splitHighlight("Al-Kahf", "kah")).toEqual([
      { match: false, text: "Al-" },
      { match: true, text: "Kah" },
      { match: false, text: "f" },
    ]);
    expect(splitHighlight("Al-Kahf", "  ")).toEqual([
      { match: false, text: "Al-Kahf" },
    ]);
  });
});
