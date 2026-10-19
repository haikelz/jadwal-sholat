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
  DialogTrigger,
} from "@/components/ui/dialog";
import { AsmaulHusnaProps } from "@/interfaces";
import reactStringReplace from "react-string-replace";

type DialogAsmaulHusnaProps = {
  dataAsmaulHusna: AsmaulHusnaProps;
  deferredSearch: string;
};

export function DialogAsmaulHusna({
  dataAsmaulHusna,
  deferredSearch,
}: DialogAsmaulHusnaProps) {
  return (
    <Dialog>
      <Frame
        variant="ghost"
        data-cy="card"
        className="group relative has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring"
      >
        <FramePanel className="flex items-center justify-between gap-4 transition-colors group-hover:bg-muted/50">
          <div className="flex min-w-0 flex-col gap-0.5">
            <FrameTitle>
              <DialogTrigger asChild>
                <button
                  type="button"
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
              </DialogTrigger>
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {dataAsmaulHusna.urutan}. {dataAsmaulHusna.latin}
          </DialogTitle>
          <DialogDescription>{dataAsmaulHusna.arti}</DialogDescription>
        </DialogHeader>
        <p
          lang="ar"
          dir="rtl"
          className="arabic-font py-6 text-center text-4xl"
        >
          {dataAsmaulHusna.arab}
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Tutup</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
