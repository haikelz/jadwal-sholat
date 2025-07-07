import { AsmaulHusnaProps } from "@/interfaces";
import { cn } from "@/lib/utils/cn";
import reactStringReplace from "react-string-replace";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

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
        <Card data-cy="card" role="button" tabIndex={0}>
          <CardHeader className="my-3 w-full text-right">
            <p className={cn("text-3xl font-medium", "arabic-font")}>
              {dataAsmaulHusna.arab}
            </p>
          </CardHeader>
          <CardContent className="mt-1 text-left">
            <h3 className="text-lg mb-1 font-bold">
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
            </h3>
            <p>{dataAsmaulHusna.arti}</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogOverlay />
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
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
