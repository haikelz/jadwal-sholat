"use client";

import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { SortByOrder } from "~components/atoms";
import { ErrorWhileFetch, SearchBar } from "~components/molecules";
import { ListAsmaulHusna } from "~components/organisms";
import { useAscending } from "~hooks";
import { AsmaulHusnaProps } from "~interfaces";
import { cx } from "~lib/helpers";
import { asmaulHusnaQuery } from "~lib/utils/graphql/query";

import LoadingClient from "./loading-client";

export function AsmaulHusnaClient() {
  const searchParams = useSearchParams();

  const { isAscending, setIsAscending, deferredSearch } = useAscending(
    searchParams.get("search") as string
  );
  const { data, loading, error } = useQuery(asmaulHusnaQuery);

  if (loading) return <LoadingClient />;
  if (error) return <ErrorWhileFetch />;

  const asmaulHusna = data.data as AsmaulHusnaProps[];

  return (
    <>
      <div className={cx("flex flex-col items-center justify-center")}>
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
