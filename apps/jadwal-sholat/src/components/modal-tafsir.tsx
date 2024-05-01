"use client";

import { ClipboardCheck, ClipboardCopy, X } from "lucide-react";
import { useCallback } from "react";
import { match } from "ts-pattern";
import { useClipboard } from "use-clipboard-copy";
import { SuratProps } from "~interfaces";
import { cn } from "~lib/utils/cn";
import useGlobalStore from "~store";

export default function ModalTafsir({ data }: SuratProps) {
  const clipboard = useClipboard({ copiedTimeout: 1000 });

  const { tafsir, setTafsir } = useGlobalStore((state) => ({
    tafsir: state.tafsir,
    setTafsir: state.setTafsir,
  }));

  const copyToClipboard = useCallback(
    (tafsir: string) => {
      clipboard.copy(tafsir);
    },
    [clipboard]
  );

  return (
    <>
      {match({ tafsir: tafsir })
        .with({ tafsir: true }, () => (
          <div
            aria-modal="true"
            className={cn(
              "modal-blur fixed inset-0 top-0 z-50",
              "flex min-h-screen w-full items-center justify-center",
              "overflow-x-hidden"
            )}
          >
            <div className="relative w-full max-w-2xl p-4 md:h-auto">
              <div
                className={cn(
                  "relative rounded-lg bg-white",
                  "dark:bg-gray-950 border border-input dark:text-white"
                )}
              >
                <div className="flex items-center justify-between rounded-t border-b border-b-input p-4">
                  <h3 className="text-xl font-semibold">
                    Tafsir Surat {data.asma.id.short}
                  </h3>
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      type="button"
                      aria-label="copy to clipboard"
                      onClick={() => copyToClipboard(data.tafsir.id)}
                      className={cn(
                        "ml-auto inline-flex items-center rounded-lg",
                        "bg-transparent p-1.5 text-sm transition-all",
                        "hover:bg-gray-200",
                        "dark:text-white dark:hover:text-gray-900"
                      )}
                    >
                      {match({ copied: clipboard.copied })
                        .with({ copied: true }, () => (
                          <ClipboardCheck size={20} />
                        ))
                        .otherwise(() => (
                          <ClipboardCopy size={20} />
                        ))}
                    </button>
                    <button
                      type="button"
                      className={cn(
                        "ml-auto inline-flex items-center rounded-lg",
                        "bg-transparent p-1.5 text-sm transition-all",
                        "hover:bg-gray-200",
                        "dark:text-white dark:hover:text-gray-900"
                      )}
                      onClick={() => setTafsir(!tafsir)}
                      aria-label="close modal tafsir"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
                <div className="space-y-6 p-6">
                  <p className="text-base leading-relaxed ">{data.tafsir.id}</p>
                </div>
              </div>
            </div>
          </div>
        ))
        .otherwise(() => null)}
    </>
  );
}
