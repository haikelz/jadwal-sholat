"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useGlobalStore from "@/store";

export function DialogNotification({ description }: { description: string }) {
  const { notification, setNotification } = useGlobalStore((state) => ({
    notification: state.notification,
    setNotification: state.setNotification,
  }));

  return (
    <Dialog open={notification} onOpenChange={setNotification}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <DialogTitle className="text-xl leading-snug">Pemberitahuan</DialogTitle>
          <DialogDescription className="text-base text-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <Button type="button" className="mx-auto font-semibold">
            Mengerti
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
