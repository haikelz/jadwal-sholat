import { cn } from "@/lib/utils/cn";
import useGlobalStore from "@/store";
import { X } from "lucide-react";

export default function ModalAsmaulHusna() {
  const { setNumberModalAsmaulHusna, dataAsmaulHusna } = useGlobalStore(
    (state) => ({
      setNumberModalAsmaulHusna: state.setNumberModalAsmaulHusna,
      dataAsmaulHusna: state.dataAsmaulHusna,
    })
  );

  return (
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
            <span className="text-xl font-semibold">
              {dataAsmaulHusna.urutan}. {dataAsmaulHusna.latin}
            </span>
            <div className="flex justify-center items-center space-x-2">
              <button
                type="button"
                className={cn(
                  "ml-auto inline-flex items-center rounded-lg",
                  "bg-transparent p-1.5 text-sm transition-all",
                  "hover:bg-gray-200",
                  "dark:text-white dark:hover:text-gray-900"
                )}
                aria-label="close modal asmaul husna"
                onClick={() => setNumberModalAsmaulHusna(0)}
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="space-y-6 p-6">
            <h3 className="text-3xl arabic-font">{dataAsmaulHusna.arab}</h3>
            <p className="text-base leading-relaxed">{dataAsmaulHusna.arti}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
