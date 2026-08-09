"use client";

import { SuratProps } from "@/interfaces";
import { MessageSquare } from "lucide-react";
import { useCallback } from "react";
import { useClipboard } from "use-clipboard-copy";
import { Button } from "@/components/ui/button";
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
        <Button type="button" variant="ghost">
          <MessageSquare size={20} />
          <span className="font-bold">Tafsir</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tafsir Surat {data.asma.id.short}</DialogTitle>
          <DialogDescription>
            Tafsir ringkas dalam bahasa Indonesia.
          </DialogDescription>
        </DialogHeader>
        <p className="max-h-[60dvh] overflow-y-auto text-left leading-relaxed">
          {data.tafsir.id}
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Tutup</Button>
          </DialogClose>
          <Button onClick={() => copyToClipboard(data.tafsir.id)}>
            {clipboard.copied ? "Tersalin" : "Salin tafsir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
