"use client";

import { useClickOutside } from "@/hooks";
import { cn } from "@/lib/utils/cn";
import useGlobalStore from "@/store";
import { RefObject, useRef } from "react";

import { Button } from "../ui/button";

export function DialogNotification({ description }: { description: string }) {
  const { notification, setNotification } = useGlobalStore((state) => ({
    notification: state.notification,
    setNotification: state.setNotification,
  }));

  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(
    setNotification,
    modalRef as RefObject<HTMLDivElement>,
    false
  );

  return (
    <>
      {notification ? (
        <div
          aria-modal="true"
          className={cn(
            "fixed inset-0 top-0 z-50 backdrop-blur-md bg-white/70",
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
      ) : null}
    </>
  );
}
