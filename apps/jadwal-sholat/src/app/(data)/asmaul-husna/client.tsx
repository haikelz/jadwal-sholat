"use client";

import { gql, useQuery } from "@apollo/client";
import cx from "classix";
import { useState } from "react";
import { SortByOrder } from "~components/atoms";
import { ErrorWhileFetch, SearchBar } from "~components/molecules";
import { ListAsmaulHusna } from "~components/organisms";
import { useAscending } from "~hooks";
import { AsmaulHusnaProps } from "~interfaces";

import LoadingClient from "./loading-client";

export function AsmaulHusnaClient(): JSX.Element {
  const [search, setSearch] = useState<string>("");

  const asmaulHusnaQuery = gql`
    query GetAllAsmaulHusna {
      data
    }
  `;

  const { isAscending, setIsAscending, deferredSearch } = useAscending(search);
  const { data, loading, error } = useQuery(asmaulHusnaQuery);

  if (loading) return <LoadingClient />;
  if (error) return <ErrorWhileFetch />;

  const asmaulHusna = data.data as AsmaulHusnaProps[];

  return (
    <>
      <div className={cx("flex flex-col items-center justify-center")}>
        <SearchBar search={search} setSearch={setSearch} />
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
