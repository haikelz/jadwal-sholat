"use client";

import { SuratProps } from "@/interfaces";
import { MessageSquare } from "lucide-react";
import { useCallback } from "react";
import { useClipboard } from "use-clipboard-copy";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

export function DialogTafsir({ data }: SuratProps) {
  const clipboard = useClipboard({ copiedTimeout: 1000 });

  const copyToClipboard = useCallback(
    (tafsir: string) => {
      clipboard.copy(tafsir);
    },
    [clipboard]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="flex items-center space-x-1">
          <MessageSquare size={20} />
          <p className="text-lg font-bold">Tafsir</p>
        </button>
      </DialogTrigger>
      <DialogOverlay />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tafsir Surat {data.asma.id.short}</DialogTitle>
        </DialogHeader>
        <p className="leading-relaxed text-justify">{data.tafsir.id}</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button onClick={() => copyToClipboard(data.tafsir.id)}>
            {clipboard.copied ? "Copied!" : "Copy"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
