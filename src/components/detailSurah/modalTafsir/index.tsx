import { useState } from "react";

import { MdClose } from "react-icons/md";
import { suratProps } from "src/props";

const ModalTafsir = ({ surat, tafsir, tafsirClick }: suratProps) => {
  const [close, setClose] = useState(false);

  return (
    <>
      {!tafsir ? (
        ""
      ) : (
        <div
          id="defaultModal"
          tabIndex={-1}
          aria-hidden="true"
          className="overflow-y-auto flex justify-center text-black items-center backdrop-blur-[3px] overflow-x-hidden top-0 fixed z-50 w-full md:inset-0  md:h-full"
        >
          <div className="relative p-4 w-full max-w-2xl h-screen md:h-auto">
            <div className="relative bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow">
              <div className="flex justify-between items-start p-4 rounded-t border-b">
                <h3 className="text-xl font-semibold">Tafsir</h3>
                <button
                  type="button"
                  className="text-gray-400 dark:text-white dark:hover:text-black bg-transparent hover:bg-gray-200  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                  data-modal-toggle="defaultModal"
                  onClick={tafsirClick}
                >
                  <MdClose className="font-bold" size="20px" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed ">{surat.tafsir.id}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalTafsir;
