import { SuratProps } from "@/types";
import { memo } from "react";
import { MdClose } from "react-icons/md";
import { twJoin } from "tailwind-merge";
import { AnimatePresence, m } from "framer-motion";
import { modalAnimation } from "@/lib/utils/animation";

const ModalTafsir = ({ surat, tafsir, dispatchTafsir }: SuratProps) => {
  return (
    <>
      <AnimatePresence key={dispatchTafsir} mode="wait">
        {tafsir ? (
          <m.div
            {...modalAnimation}
            aria-modal="true"
            className={twJoin(
              "fixed inset-0 top-0 z-50 flex min-h-screen w-full items-center justify-center",
              "overflow-y-auto overflow-x-hidden text-black backdrop-blur-[3px]"
            )}
          >
            <div className="relative w-full max-w-2xl p-4 md:h-auto">
              <div
                className={twJoin(
                  "relative rounded-lg bg-white shadow",
                  "dark:bg-gray-800 dark:text-white"
                )}
              >
                <div className="flex items-center justify-between rounded-t border-b p-4">
                  <h3 className="text-xl font-semibold">Tafsir Surat {surat.asma.id.short}</h3>
                  <button
                    type="button"
                    className={twJoin(
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
