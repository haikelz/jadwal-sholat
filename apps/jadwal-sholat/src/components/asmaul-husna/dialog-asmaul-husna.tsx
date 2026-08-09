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
          className="w-full rounded-lg border bg-card text-left text-card-foreground shadow-xs transition-[background-color,box-shadow,transform] hover:bg-accent/60 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.96]"
        >
          <span className="my-3 block w-full px-6 pt-3 text-right">
            <span className={cn("block text-3xl font-medium", "arabic-font")}>
              {dataAsmaulHusna.arab}
            </span>
          </span>
          <span className="mt-1 block px-6 pb-6 text-left">
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
                    )
                  )
                : dataAsmaulHusna.latin}
            </span>
            <span className="block">{dataAsmaulHusna.arti}</span>
          </span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {dataAsmaulHusna.urutan}. {dataAsmaulHusna.latin}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-6 flex justify-center items-center text-center flex-col">
          <h3 className="text-3xl arabic-font">{dataAsmaulHusna.arab}</h3>
          <p className="text-base leading-relaxed">{dataAsmaulHusna.arti}</p>
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
