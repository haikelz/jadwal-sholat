import { clsx } from "clsx";
import { AnimatePresence, m } from "framer-motion";
import { useAtom } from "jotai";
import { memo } from "react";
import { notificationAtom } from "~store";

const modalAnimation = {
  initial: { opacity: 0, scale: 0.75 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2, animation: "ease-out" } },
  exit: { opacity: 0, scale: 0, transition: { duration: 0.2, animation: "ease-in" } },
};

const ModalNotification = ({ description }: { description: string }) => {
  const [notification, setNotification] = useAtom(notificationAtom);

  return (
    <>
      <AnimatePresence mode="wait">
        {notification ? (
          <m.div
            {...modalAnimation}
            aria-modal="true"
            className={clsx(
              "modal-blur fixed inset-0 top-0 z-50 flex min-h-screen w-full items-center justify-center",
              "overflow-y-auto overflow-x-hidden text-black backdrop-blur-[3px]"
            )}
          >
            <div className="relative md:h-auto">
              <div className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 dark:text-white">
                <div className="flex flex-col items-center justify-between rounded-t p-4">
                  <p className="text-2xl font-bold">{description}</p>
                  <button
                    type="button"
                    className={clsx(
                      "mt-2 inline-flex items-center rounded-md bg-blue-500 py-1.5 px-4",
                      "font-semibold text-white shadow-md transition-all ease-in-out",
                      "hover:bg-gray-200 hover:text-black dark:hover:text-black"
                    )}
                    onClick={() => setNotification(!notification)}
                  >
                    Got it!
                  </button>
                </div>
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default memo(ModalNotification);
