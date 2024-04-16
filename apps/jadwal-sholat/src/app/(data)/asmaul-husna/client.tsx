"use client";

import { useSearchParams } from "next/navigation";
import { SortByOrder } from "~components/atoms";
import { SearchBar } from "~components/molecules";
import { ListAsmaulHusna } from "~components/organisms";
import { useAscending } from "~hooks";
import { AsmaulHusnaProps } from "~interfaces";
import { cx } from "~lib/helpers";

export function AsmaulHusnaClient(
  { asmaulHusna }: { asmaulHusna: AsmaulHusnaProps[] }
) {
  const searchParams = useSearchParams();

  const { isAscending, setIsAscending, deferredSearch } = useAscending(
    searchParams.get("search") as string
  );

  return (
    <>
      <div className={cx("flex flex-col items-center justify-center mb-7")}>
        <SearchBar searchParams={searchParams} name="search" />
      </div>
      <SortByOrder isAscending={isAscending} setIsAscending={setIsAscending} />
      <ListAsmaulHusna
        asmaulHusna={asmaulHusna}
        deferredSearch={deferredSearch}
        isAscending={isAscending}
      />
    </>
  );
}
