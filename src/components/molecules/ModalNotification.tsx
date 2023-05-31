import { cx } from "classix";
import { AnimatePresence, m } from "framer-motion";
import { memo } from "react";
import { shallow } from "zustand/shallow";
import { modalAnimation } from "~lib/utils/animations";
import useAppStore from "~store";

export default function ModalNotification({ description }: { description: string }) {
  const { notification, setNotification } = useAppStore(
    (state) => ({
      notification: state.notification,
      setNotification: state.setNotification,
    }),
    shallow
  );

  return (
    <AnimatePresence mode="wait">
      {notification ? (
        <m.div
          transition={{ duration: 0.3 }}
          variants={modalAnimation}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-modal="true"
          className={cx(
            "modal-blur fixed inset-0 top-0 z-50",
            "flex min-h-screen w-full items-center justify-center",
            "overflow-y-auto overflow-x-hidden text-black backdrop-blur-[3px]"
          )}
        >
          <div className="relative md:h-auto">
            <div
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
                    "hover:bg-gray-200 hover:text-black",
                    "dark:hover:text-black"
                  )}
                  onClick={() => setNotification(false)}
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

memo(ModalNotification);
