"use client";

import { useSearchParams } from "next/navigation";
import { SortByOrder } from "~components/atoms";
import { SearchBar } from "~components/molecules";
import { ListKota } from "~components/organisms";
import { useAscending } from "~hooks";
import { KotaProps } from "~interfaces";
import { cx } from "~lib/helpers";

export default function JadwalSholatClient({ kota }: { kota: KotaProps[] }) {
  const searchParams = useSearchParams();

  const { isAscending, setIsAscending, deferredSearch } = useAscending(
    searchParams.get("search") as string
  );

  return (
    <>
      <div className={cx("flex flex-col items-center justify-center")}>
        <SearchBar searchParams={searchParams} name="search" />
      </div>
      <SortByOrder isAscending={isAscending} setIsAscending={setIsAscending} />
      <ListKota
        kota={kota}
        deferredSearch={deferredSearch}
        isAscending={isAscending}
      />
    </>
  );
}
