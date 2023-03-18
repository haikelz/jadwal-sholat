import { AnimatePresence, m } from "framer-motion";
import { memo } from "react";
import { MdClose } from "react-icons/md";
import { clsx } from "clsx";
import { SuratProps } from "~types";

const modalAnimation = {
  initial: { opacity: 0, scale: 0.75 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2, animation: "ease-out" } },
  exit: { opacity: 0, scale: 0, transition: { duration: 0.2, animation: "ease-in" } },
};

const ModalTafsir = ({ surat, tafsir, dispatchTafsir }: SuratProps) => {
  return (
    <>
      <AnimatePresence key={dispatchTafsir} mode="wait">
        {tafsir ? (
          <m.div
            {...modalAnimation}
            aria-modal="true"
            className={clsx(
              "modal-blur fixed inset-0 top-0 z-50 flex min-h-screen w-full items-center justify-center blur-md",
              "overflow-y-auto overflow-x-hidden text-black"
            )}
          >
            <div className="relative w-full max-w-2xl p-4 md:h-auto">
              <div
                className={clsx(
                  "relative rounded-lg bg-white shadow",
                  "dark:bg-gray-800 dark:text-white"
                )}
              >
                <div className="flex items-center justify-between rounded-t border-b p-4">
                  <h3 className="text-xl font-semibold">Tafsir Surat {surat.asma.id.short}</h3>
                  <button
                    type="button"
                    className={clsx(
                      "ml-auto inline-flex items-center rounded-lg",
                      "bg-transparent p-1.5 text-sm text-gray-400 transition-all ease-in-out",
                      "hover:bg-gray-200 dark:text-white dark:hover:text-black"
                    )}
                    onClick={() => dispatchTafsir({ type: "tafsir" })}
                  >
                    <MdClose className="font-bold" size={24} />
                  </button>
                </div>
                <div className="space-y-6 p-6">
                  <p className="text-base leading-relaxed ">{surat.tafsir.id}</p>
                </div>
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default memo(ModalTafsir);
