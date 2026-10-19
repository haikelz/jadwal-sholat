"use client";

import { SearchBar } from "@/components/common/search-bar";
import { SortByOrder } from "@/components/common/sort-by-order";
import { Badge } from "@/components/reui/badge";
import { Button } from "@/components/ui/button";
import {
  Frame,
  FrameDescription,
  FramePanel,
  FrameTitle,
} from "@/components/reui/frame";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useAscending } from "@/hooks";
import { ListSuratProps } from "@/interfaces";
import { removeSelectedSurat } from "@/lib/helpers";
import useGlobalStore from "@/store";
import { BookMarked, SearchX } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useEffect, useMemo } from "react";
import reactStringReplace from "react-string-replace";

export function QuranPage({ surat }: { surat: ListSuratProps }) {
  const [search, setSearch] = useQueryState("search");

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
        .filter((item) => {
          if (deferredSearch === "" || deferredSearch === null) return item;
          else if (
            item.asma.id.short
              .toLowerCase()
              .includes(deferredSearch.toLowerCase())
          )
            return item;
        })
        .sort((a, b) => {
          if (isAscending) return Number(a.number) - Number(b.number);
          if (!isAscending) return Number(b.number) - Number(a.number);
          return 0;
        }),
    [surat, deferredSearch, isAscending],
  );

  useEffect(() => {
    if (localStorage.getItem("surat") as string) {
      setLastRead(JSON.parse(localStorage.getItem("surat") as string));
    }
  }, [setLastRead]);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar value={search} setSearch={setSearch} name="search" />
        <div className="flex min-w-0 items-center justify-between gap-3 lg:justify-end">
          <p className="flex min-w-0 items-center gap-1 text-sm text-muted-foreground">
            <span className="shrink-0">Terakhir dibaca:</span>
            {lastRead.ayat || lastRead.number !== null ? (
              <Link
                href={`/quran/${lastRead.number}`}
                onClick={() =>
                  localStorage.setItem(
                    "selected-surat",
                    lastRead.number!.toString() as string,
                  )
                }
                className="min-w-0 truncate font-medium text-foreground underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Surat {lastRead.name} ayat {lastRead.ayat}
              </Link>
            ) : (
              <span className="font-medium text-foreground">belum ada</span>
            )}
          </p>
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
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredSurat.map((surat) => (
            <Frame
              key={surat.number}
              variant="ghost"
              data-cy="card"
              className="group relative has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring"
            >
              <FramePanel className="flex flex-col gap-1 transition-colors group-hover:bg-muted/50">
                <div className="flex items-start justify-between gap-2">
                  <FrameTitle>
                    <Link
                      href={`/quran/${surat.number}`}
                      onClick={removeSelectedSurat}
                      className="outline-none after:absolute after:inset-0"
                    >
                      <span className="tabular-nums">{surat.number}.</span>{" "}
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
                    </Link>
                  </FrameTitle>
                  <Badge variant="outline">{surat.type.id}</Badge>
                </div>
                <FrameDescription className="flex items-center gap-2">
                  <span className="truncate">{surat.asma.translation.id}</span>
                  <span
                    aria-hidden
                    className="size-1 shrink-0 rounded-full bg-muted-foreground/40"
                  />
                  <span className="shrink-0 tabular-nums">
                    {surat.ayahCount} ayat
                  </span>
                </FrameDescription>
              </FramePanel>
            </Frame>
          ))}
        </div>
      ) : (
        <Empty data-cy="not-found-text" className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchX aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>Surat tidak ditemukan</EmptyTitle>
            <EmptyDescription>
              Coba kata kunci lain atau hapus pencarian.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" onClick={() => setSearch(null)}>
              Hapus pencarian
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
}
