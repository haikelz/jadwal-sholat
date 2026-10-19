"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AsmaulHusnaProps } from "@/interfaces";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import reactStringReplace from "react-string-replace";

export function AsmaulHusnaRow({
  dataAsmaulHusna,
  deferredSearch,
}: {
  dataAsmaulHusna: AsmaulHusnaProps;
  deferredSearch: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timeout = setTimeout(() => setIsCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [isCopied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        `${dataAsmaulHusna.latin} (${dataAsmaulHusna.arab}): ${dataAsmaulHusna.arti}`,
      );
      setIsCopied(true);
    } catch {
      // Clipboard access can be denied; the button simply stays as it was.
    }
  }

  return (
    <li
      data-cy="card"
      className="flex items-center justify-between gap-4 px-2 py-3"
    >
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="text-sm font-medium">
          <span className="tabular-nums">{dataAsmaulHusna.urutan}.</span>{" "}
          {deferredSearch
            ? reactStringReplace(
                dataAsmaulHusna.latin,
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
            : dataAsmaulHusna.latin}
        </p>
        <p className="text-sm text-muted-foreground">{dataAsmaulHusna.arti}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <p lang="ar" dir="rtl" className="arabic-font text-2xl">
          {dataAsmaulHusna.arab}
        </p>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={isCopied ? "Tersalin" : "Salin"}
              onClick={handleCopy}
            >
              {isCopied ? (
                <Check aria-hidden="true" />
              ) : (
                <Copy aria-hidden="true" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{isCopied ? "Tersalin" : "Salin"}</TooltipContent>
        </Tooltip>
      </div>
    </li>
  );
}
