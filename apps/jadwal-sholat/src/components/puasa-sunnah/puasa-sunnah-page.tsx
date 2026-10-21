"use client";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/reui/alert";
import { Frame, FrameHeader, FramePanel } from "@/components/reui/frame";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetch, useNow } from "@/hooks";
import { PuasaSunnahScheduleResponse, PuasaSunnahTypeKey } from "@/interfaces";
import { formatToIndonesianDate } from "@/lib/helpers/format-to-indonesian-date";
import { getDateParts } from "@/lib/utils/date-parts";
import { format } from "date-fns";
import useGlobalStore from "@/store";
import { CalendarX, CircleAlert } from "lucide-react";
import { useId } from "react";
import { TablePuasaSunnah } from "../table-puasa-sunnah";
import { PuasaCalendar } from "./puasa-calendar";

const puasaTypesList = [
  { key: "all", name: "Semua" },
  { key: "monday_thursday", name: "Puasa Senin dan Kamis" },
  { key: "white_days", name: "Puasa Ayyamul Bidh" },
  { key: "six_shawwal_candidate", name: "Enam hari puasa Syawal" },
  { key: "ashura", name: "Puasa Asyura dan hari pendamping" },
  {
    key: "first_nine_dhul_hijjah",
    name: "Sembilan hari pertama Zulhijah",
  },
  { key: "arafah", name: "Puasa Arafah" },
] as const;

const listMonthInYear = [
  { id: "01", month: "Januari" },
  { id: "02", month: "Februari" },
  { id: "03", month: "Maret" },
  { id: "04", month: "April" },
  { id: "05", month: "Mei" },
  { id: "06", month: "Juni" },
  { id: "07", month: "Juli" },
  { id: "08", month: "Agustus" },
  { id: "09", month: "September" },
  { id: "10", month: "Oktober" },
  { id: "11", month: "November" },
  { id: "12", month: "Desember" },
];

export function PuasaSunnahPage() {
  const monthId = useId();
  const typeId = useId();
  const { selectedType, setSelectedType, selectedMonth, setSelectedMonth } =
    useGlobalStore((state) => ({
      selectedMonth: state.selectedMonth,
      setSelectedMonth: state.setSelectedMonth,
      selectedType: state.selectedType,
      setSelectedType: state.setSelectedType,
    }));

  const now = useNow();
  const today = now ? getDateParts(now) : null;
  const todayIso = now ? format(now, "yyyy-MM-dd") : undefined;
  const month = selectedMonth ?? today?.bulan;

  const { data, isPending, isError, isRefetching, refetch } =
    useFetch<PuasaSunnahScheduleResponse>(
      // Wait for the clock so a prerendered page never asks for the build month.
      today && month
        ? `/api/puasa-sunnah?period=month&date=${today.tahun}-${month}-01`
        : "",
    );

  const filters = (
    <FrameHeader className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:items-center">
      <label htmlFor={monthId} className="sr-only">
        Bulan
      </label>
      <Select
        value={month ?? ""}
        onValueChange={(value) => setSelectedMonth({ selectedMonth: value })}
      >
        <SelectTrigger id={monthId} className="w-full min-w-0 sm:w-40">
          <SelectValue placeholder="Pilih bulan" />
        </SelectTrigger>
        <SelectContent>
          {listMonthInYear.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <label htmlFor={typeId} className="sr-only">
        Jenis puasa
      </label>
      <Select
        value={selectedType}
        onValueChange={(value) =>
          setSelectedType({
            selectedType: value as PuasaSunnahTypeKey | "all",
          })
        }
      >
        <SelectTrigger id={typeId} className="w-full min-w-0 sm:w-72">
          <SelectValue placeholder="Pilih jenis puasa" />
        </SelectTrigger>
        <SelectContent>
          {puasaTypesList.map((type) => (
            <SelectItem key={type.key} value={type.key}>
              {type.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FrameHeader>
  );

  const puasaList = (data?.data?.dates ?? [])
    .filter(
      (puasa) =>
        selectedType === "all" ||
        puasa.recommendations.some(
          (recommendation) => recommendation.key === selectedType,
        ),
    )
    .map((puasa) => ({
      ...puasa,
      recommendations:
        selectedType === "all"
          ? puasa.recommendations
          : puasa.recommendations.filter(
              (recommendation) => recommendation.key === selectedType,
            ),
    }));

  // The first fast from today on in the shown month and type, if any.
  const nextFast = todayIso
    ? puasaList.find((puasa) => puasa.date.slice(0, 10) >= todayIso)
    : undefined;

  const isLoading = isPending || isRefetching;

  return (
    <Frame spacing="default">
      {filters}
      {isLoading ? (
        <FramePanel
          role="status"
          aria-live="polite"
          className="flex flex-col gap-3"
        >
          <span className="sr-only">Memuat jadwal puasa sunnah…</span>
          <div className="flex flex-col gap-3 md:hidden">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="flex items-center gap-4">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-5 w-32 rounded-full" />
              </div>
            ))}
          </div>
          {/* Desktop shows a month calendar, so its skeleton is one too. */}
          <div className="hidden grid-cols-7 gap-2 md:grid">
            {Array.from({ length: 35 }, (_, index) => (
              <Skeleton key={index} className="h-24" />
            ))}
          </div>
        </FramePanel>
      ) : isError ? (
        <FramePanel>
          <Alert variant="destructive">
            <CircleAlert aria-hidden="true" />
            <AlertTitle>Jadwal belum dapat dimuat</AlertTitle>
            <AlertDescription>
              Periksa koneksi internet, lalu coba lagi.
            </AlertDescription>
            <AlertAction>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Coba lagi
              </Button>
            </AlertAction>
          </Alert>
        </FramePanel>
      ) : puasaList.length > 0 ? (
        <>
          {nextFast ? (
            <FramePanel fit>
              <p className="flex flex-wrap items-center gap-x-2 text-sm">
                <span className="text-muted-foreground">Berikutnya</span>
                <span className="font-medium">
                  {formatToIndonesianDate(nextFast.date)}
                </span>
                <span
                  aria-hidden
                  className="size-1 shrink-0 rounded-full bg-muted-foreground/40"
                />
                <span className="text-muted-foreground">
                  {nextFast.recommendations
                    .map((recommendation) => recommendation.name)
                    .join(", ")}
                </span>
              </p>
            </FramePanel>
          ) : null}
          {/* Phones keep the list; from md up the month reads as a calendar. */}
          <FramePanel className="p-0 md:hidden">
            <TablePuasaSunnah
              puasaList={puasaList}
              today={today?.currentDateWithDayOfWeek}
              todayIso={todayIso}
            />
          </FramePanel>
          {today && month ? (
            <FramePanel className="hidden p-0 md:block">
              <PuasaCalendar
                year={today.tahun}
                month={month}
                puasaList={puasaList}
                todayIso={todayIso}
              />
            </FramePanel>
          ) : null}
        </>
      ) : (
        <FramePanel>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CalendarX aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>Belum ada jadwal</EmptyTitle>
              <EmptyDescription>
                {data?.data
                  ? "Tidak ada jadwal untuk jenis puasa ini bulan ini."
                  : "Jadwal puasa sunnah tidak ditemukan."}
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              {data?.data && selectedType !== "all" ? (
                <Button
                  variant="outline"
                  onClick={() => setSelectedType({ selectedType: "all" })}
                >
                  Tampilkan semua
                </Button>
              ) : (
                <Button variant="outline" onClick={() => refetch()}>
                  Muat ulang
                </Button>
              )}
            </EmptyContent>
          </Empty>
        </FramePanel>
      )}
    </Frame>
  );
}
