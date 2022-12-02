import { MdClose } from "react-icons/md";
import { Surat } from "@/interfaces";

const ModalTafsir = ({ surat, tafsir, dispatchTafsir }: Surat) => {
  return (
    <>
      {tafsir ? (
        <div
          tabIndex={-1}
          aria-hidden={true}
          className="fixed inset-0 top-0 z-50 flex min-h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden text-black backdrop-blur-[3px]"
        >
          <div className="relative w-full max-w-2xl p-4 md:h-auto">
            <div className="relative rounded-lg bg-white shadow dark:bg-gray-800 dark:text-white">
              <div className="flex items-center justify-between rounded-t border-b p-4">
                <h3 className="text-xl font-semibold">Tafsir Surat {surat.asma.id.short}</h3>
                <button
                  type="button"
                  className="ml-auto inline-flex items-center rounded-lg bg-transparent  p-1.5 text-sm text-gray-400 hover:bg-gray-200 dark:text-white dark:hover:text-black"
                  onClick={() => dispatchTafsir({ type: "tafsir" })}
                >
                  <MdClose className="font-bold" size={20} />
                </button>
              </div>
              <div className="space-y-6 p-6">
                <p className="text-base leading-relaxed ">{surat.tafsir.id}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ModalTafsir;
