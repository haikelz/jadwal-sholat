import { AsmaulHusnaPage } from "@/components/asmaul-husna/asmaul-husna-page";
import { Providers } from "@/components/providers";
import type { AsmaulHusnaProps } from "@/interfaces";

export function AsmaulHusnaIsland({
  asmaulHusna,
}: {
  asmaulHusna: AsmaulHusnaProps[];
}) {
  return (
    <Providers>
      <AsmaulHusnaPage asmaulHusna={asmaulHusna} />
    </Providers>
  );
}
