"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
        <DialogHeader>
          <DialogTitle>Pemberitahuan</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Mengerti</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
