import { Button } from "@/components/ui/button";
import {
  Frame,
  FrameDescription,
  FramePanel,
  FrameTitle,
} from "@/components/reui/frame";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AsmaulHusnaProps } from "@/interfaces";
import reactStringReplace from "react-string-replace";

export function AsmaulHusnaItem({
  dataAsmaulHusna,
  deferredSearch,
  onSelect,
}: {
  dataAsmaulHusna: AsmaulHusnaProps;
  deferredSearch: string;
  onSelect: (item: AsmaulHusnaProps) => void;
}) {
  return (
    <Frame
      variant="ghost"
      data-cy="card"
      className="group relative has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring"
    >
      <FramePanel className="flex items-center justify-between gap-4 transition-colors group-hover:bg-muted/50">
        <div className="flex min-w-0 flex-col gap-0.5">
          <FrameTitle>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => onSelect(dataAsmaulHusna)}
              className="text-left outline-none after:absolute after:inset-0"
            >
              {dataAsmaulHusna.urutan}.{" "}
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
            </button>
          </FrameTitle>
          <FrameDescription>{dataAsmaulHusna.arti}</FrameDescription>
        </div>
        <p
          lang="ar"
          dir="rtl"
          className="arabic-font shrink-0 text-3xl font-medium"
        >
          {dataAsmaulHusna.arab}
        </p>
      </FramePanel>
    </Frame>
  );
}

/**
 * One dialog for the whole list instead of one per name; the page passes the
 * selected item. Radix returns focus to the button that opened it.
 */
export function AsmaulHusnaDialog({
  selected,
  onOpenChange,
}: {
  selected: AsmaulHusnaProps | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={selected !== null} onOpenChange={onOpenChange}>
      {selected ? (
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selected.urutan}. {selected.latin}
            </DialogTitle>
            <DialogDescription>{selected.arti}</DialogDescription>
          </DialogHeader>
          <p
            lang="ar"
            dir="rtl"
            className="arabic-font py-6 text-center text-4xl"
          >
            {selected.arab}
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Tutup</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
