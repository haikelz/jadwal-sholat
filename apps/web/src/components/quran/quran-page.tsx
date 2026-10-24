import { SearchBar } from "@/components/common/search-bar";
import { SortByOrder } from "@/components/common/sort-by-order";
import { Badge } from "@/components/reui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Toggle } from "@/components/ui/toggle";
import { useAscending } from "@/hooks";
import type { ListSuratProps } from "@/interfaces";
import { removeSelectedSurat } from "@/lib/helpers";
import useGlobalStore from "@/store";
import { BookMarked, BookOpenText, SearchX } from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect, useMemo, useState } from "react";
import reactStringReplace from "react-string-replace";

const typeOptions = [
  { value: "all", label: "Semua" },
  { value: "Makkiyyah", label: "Makkiyyah" },
  { value: "Madaniyyah", label: "Madaniyyah" },
] as const;

type TypeFilter = (typeof typeOptions)[number]["value"];

export function QuranPage({ surat }: { surat: ListSuratProps }) {
  const [search, setSearch] = useQueryState("search");
  const [type, setType] = useState<TypeFilter>("all");

  const { isAscending, setIsAscending, deferredSearch } = useAscending(
    search as string,
  );

  const { lastRead, setLastRead } = useGlobalStore((state) => ({
    lastRead: state.lastRead,
    setLastRead: state.setLastRead,
  }));

  const filteredSurat = useMemo(
    () =>
      surat.data
        .filter((item) => type === "all" || item.type.id === type)
        .filter(
          (item) =>
            !deferredSearch ||
            item.asma.id.short
              .toLowerCase()
              .includes(deferredSearch.toLowerCase()),
        )
        .sort((a, b) =>
          isAscending
            ? Number(a.number) - Number(b.number)
            : Number(b.number) - Number(a.number),
        ),
    [surat, deferredSearch, isAscending, type],
  );

  useEffect(() => {
    if (localStorage.getItem("surat") as string) {
      setLastRead(JSON.parse(localStorage.getItem("surat") as string));
    }
  }, [setLastRead]);

  const hasLastRead = lastRead.number !== null && lastRead.ayat !== null;

  return (
    <div className="flex w-full flex-col gap-6">
      {hasLastRead ? (
        <Button asChild className="max-w-full self-start">
          <a
            href={`/quran/${lastRead.number}`}
            onClick={() =>
              localStorage.setItem("selected-surat", String(lastRead.number))
            }
          >
            <BookOpenText aria-hidden="true" data-icon="inline-start" />
            <span className="truncate">
              Lanjutkan membaca: {lastRead.name} ayat {lastRead.ayat}
            </span>
          </a>
        </Button>
      ) : null}
      <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <SearchBar value={search} setSearch={setSearch} name="search" />
        <div className="flex flex-wrap items-center justify-between gap-2 md:justify-end">
          <div
            role="group"
            aria-label="Jenis surat"
            className="flex flex-wrap items-center gap-1"
          >
            {typeOptions.map((option) => (
              <Toggle
                key={option.value}
                variant="outline"
                pressed={type === option.value}
                onPressedChange={() => setType(option.value)}
              >
                {option.label}
              </Toggle>
            ))}
          </div>
          <SortByOrder
            isAscending={isAscending}
            setIsAscending={setIsAscending}
          />
        </div>
      </div>
      {surat.data.length === 0 ? (
        <Empty data-cy="not-found-text" className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BookMarked aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>Data surat belum tersedia</EmptyTitle>
            <EmptyDescription>
              Muat ulang halaman untuk mencoba lagi.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => window.location.reload()}>Muat ulang</Button>
          </EmptyContent>
        </Empty>
      ) : filteredSurat.length ? (
        // One column on phones; on wider screens the 114 surahs flow into
        // columns instead of stretching each row across the page.
        <ul className="grid w-full grid-cols-1 border-t md:grid-cols-2 md:gap-x-8 lg:grid-cols-3">
          {filteredSurat.map((surat) => (
            <li key={surat.number} data-cy="card" className="border-b">
              <a
                href={`/quran/${surat.number}`}
                onClick={removeSelectedSurat}
                className="flex items-center gap-3 px-2 py-3 transition-colors outline-none hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring dark:hover:bg-muted/30"
              >
                <span className="w-8 shrink-0 text-sm text-muted-foreground tabular-nums">
                  {surat.number}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate text-sm font-medium">
                    {deferredSearch
                      ? reactStringReplace(
                          surat.asma.id.short,
                          deferredSearch,
                          (match: string, index: number) => (
                            <mark
                              key={index + 1}
                              className="bg-primary/15 text-foreground"
                            >
                              {match}
                            </mark>
                          ),
                        )
                      : surat.asma.id.short}
                  </span>
                  <span className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
                    <span className="truncate">
                      {surat.asma.translation.id}
                    </span>
                    <span
                      aria-hidden
                      className="size-1 shrink-0 rounded-full bg-muted-foreground/40"
                    />
                    <span className="shrink-0 tabular-nums">
                      {surat.ayahCount} ayat
                    </span>
                  </span>
                </span>
                <Badge variant="outline" className="shrink-0">
                  {surat.type.id}
                </Badge>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <Empty data-cy="not-found-text" className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchX aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>Surat tidak ditemukan</EmptyTitle>
            <EmptyDescription>
              Coba kata kunci lain atau tampilkan semua surat.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              variant="outline"
              onClick={() => {
                setSearch(null);
                setType("all");
              }}
            >
              Tampilkan semua
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
}
