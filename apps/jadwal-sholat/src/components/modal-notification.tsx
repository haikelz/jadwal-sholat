"use client";

import { useRef } from "react";
import { match } from "ts-pattern";
import { useClickOutside } from "~hooks";
import { cn } from "~lib/utils/cn";
import useGlobalStore from "~store";

import { Button } from "./ui/button";

export default function ModalNotification(
  { description }: { description: string }
) {
  const { notification, setNotification } = useGlobalStore((state) => ({
    notification: state.notification,
    setNotification: state.setNotification,
  }));

  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(setNotification, modalRef, false);

  return (
    <>
      {match({ notification: notification })
        .with({ notification: true }, () => (
          <div
            aria-modal="true"
            className={cn(
              "modal-blur fixed inset-0 top-0 z-50",
              "flex min-h-screen w-full items-center justify-center",
              "overflow-y-auto overflow-x-hidden"
            )}
          >
            <div className="relative md:h-auto">
              <div
                ref={modalRef}
                className={cn(
                  "relative rounded-lg bg-white p-4",
                  "dark:bg-gray-950 border border-input dark:text-white"
                )}
              >
                <div className="flex flex-col items-center justify-between rounded-t p-4">
                  <p className="text-2xl font-bold">{description}</p>
                  <Button
                    type="button"
                    className={cn("mt-2 font-semibold py-1.5 px-4")}
                    onClick={() => setNotification(false)}
                  >
                    Got it!
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))
        .otherwise(() => null)}
    </>
  );
}
