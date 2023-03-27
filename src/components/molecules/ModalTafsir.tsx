import { cx } from "classix";
import { AnimatePresence, m } from "framer-motion";
import { memo } from "react";
import { MdClose } from "react-icons/md";
import { modalAnimation } from "~lib/utils/constants";
import useAppStore from "~store";
import { SuratProps } from "~models";

export default function ModalTafsir({ surat }: SuratProps) {
  const { tafsir, setTafsir } = useAppStore((state) => state);

  return (
    <>
      <AnimatePresence mode="wait">
        {tafsir ? (
          <m.div
            {...modalAnimation}
            aria-modal="true"
            className={cx(
              "modal-blur fixed inset-0 top-0 z-50 flex min-h-screen w-full",
              "items-center justify-center blur-md",
              "overflow-y-auto overflow-x-hidden text-black"
            )}
          >
            <div className="relative w-full max-w-2xl p-4 md:h-auto">
              <div
                className={cx(
                  "relative rounded-lg bg-white shadow",
                  "dark:bg-gray-800 dark:text-white"
                )}
              >
                <div className="flex items-center justify-between rounded-t border-b p-4">
                  <h3 className="text-xl font-semibold">Tafsir Surat {surat.asma.id.short}</h3>
                  <button
                    type="button"
                    className={cx(
                      "ml-auto inline-flex items-center rounded-lg",
                      "bg-transparent p-1.5 text-sm text-gray-400 transition-all ease-in-out",
                      "hover:bg-gray-200 dark:text-white dark:hover:text-black"
                    )}
                    onClick={() => setTafsir(!tafsir)}
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
}

memo(ModalTafsir);
