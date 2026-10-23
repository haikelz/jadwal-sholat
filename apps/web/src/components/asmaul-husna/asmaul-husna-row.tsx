import { Button } from "@/components/ui/button";
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
      className="flex items-center justify-between gap-4 border-b px-2 py-3"
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
        <p lang="ar" dir="rtl" className="arabic-font [--arabic-size:1.5rem]">
          {dataAsmaulHusna.arab}
        </p>
        {/* A word beside the icon: not every reader knows the copy icon. */}
        <Button
          type="button"
          variant="ghost"
          aria-label={`${isCopied ? "Tersalin" : "Salin"} ${dataAsmaulHusna.latin}`}
          onClick={handleCopy}
        >
          {isCopied ? (
            <Check aria-hidden="true" data-icon="inline-start" />
          ) : (
            <Copy aria-hidden="true" data-icon="inline-start" />
          )}
          {isCopied ? "Tersalin" : "Salin"}
        </Button>
      </div>
    </li>
  );
}
