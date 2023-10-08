"use client";

import { cx } from "classix";
import { memo, useRef } from "react";
import { useClickOutside } from "~hooks";
import useGlobalStore from "~store";

export function ModalNotification({ description }: { description: string }) {
  const { notification, setNotification } = useGlobalStore((state) => ({
    notification: state.notification,
    setNotification: state.setNotification,
  }));

  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(setNotification, modalRef);

  return (
    <>
      {notification ? (
        <div
          aria-modal="true"
          className={cx(
            "modal-blur fixed inset-0 top-0 z-50",
            "flex min-h-screen w-full items-center justify-center",
            "overflow-y-auto overflow-x-hidden  backdrop-blur-[3px]"
          )}
        >
          <div className="relative md:h-auto">
            <div
              ref={modalRef}
              className={cx(
                "relative rounded-lg bg-white p-4 shadow",
                "dark:bg-gray-800 dark:text-white"
              )}
            >
              <div className="flex flex-col items-center justify-between rounded-t p-4">
                <p className="text-2xl font-bold">{description}</p>
                <button
                  type="button"
                  className={cx(
                    "mt-2 inline-flex items-center rounded-md bg-blue-500 py-1.5 px-4",
                    "font-semibold text-white shadow-md transition-all",
                    "hover:bg-gray-200 hover:",
                    "dark:hover:"
                  )}
                  onClick={() => setNotification(false)}
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

memo(ModalNotification);
