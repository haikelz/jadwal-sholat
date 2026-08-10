import { AsmaulHusnaProps } from "@/interfaces";
import { cn } from "@/lib/utils/cn";
import reactStringReplace from "react-string-replace";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      <DialogTrigger asChild>
        <button
          type="button"
          data-cy="card"
          className="h-full w-full rounded-xl border border-border/70 bg-card text-left text-card-foreground shadow-xs transition-[background-color,border-color,box-shadow,transform] hover:border-border hover:bg-muted/40 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.96]"
        >
          <span
            className="block w-full px-6 pt-6 text-right"
            lang="ar"
            dir="rtl"
          >
            <span
              className={cn(
                "block text-4xl font-medium leading-relaxed",
                "arabic-font",
              )}
            >
              {dataAsmaulHusna.arab}
            </span>
          </span>
          <span className="mt-4 block px-6 pb-6 text-left">
            <span className="mb-1 block text-lg font-bold">
              {dataAsmaulHusna.urutan}.{" "}
              {deferredSearch
                ? reactStringReplace(
                    dataAsmaulHusna.latin,
                    deferredSearch,
                    (match: string, index: number) => (
                      <span
                        key={index + 1}
                        className="bg-lime-400 dark:bg-lime-600"
                      >
                        {match}
                      </span>
                    ),
                  )
                : dataAsmaulHusna.latin}
            </span>
            <span className="block leading-relaxed text-muted-foreground">
              {dataAsmaulHusna.arti}
            </span>
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {dataAsmaulHusna.urutan}. {dataAsmaulHusna.latin}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center space-y-6 px-2 py-8 text-center sm:px-8">
          <h3
            className="arabic-font text-4xl leading-relaxed"
            lang="ar"
            dir="rtl"
          >
            {dataAsmaulHusna.arab}
          </h3>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            {dataAsmaulHusna.arti}
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Tutup</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
