"use client";

import cx from "classix";
import { useState } from "react";
import { SortByOrder } from "~components/atoms";
import { SearchBar } from "~components/molecules";
import { ListKota } from "~components/organisms";
import { useAscending } from "~hooks";
import { KotaProps } from "~interfaces";

export default function JadwalSholatClient({ kota }: { kota: KotaProps[] }) {
  const [search, setSearch] = useState<string>("");

  const { isAscending, setIsAscending, deferredSearch } = useAscending(search);

  return (
    <>
      <div className={cx("flex flex-col items-center justify-center")}>
        <SearchBar search={search} setSearch={setSearch} />
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
