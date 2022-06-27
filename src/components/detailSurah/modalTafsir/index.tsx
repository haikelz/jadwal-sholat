import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { suratProps } from "src/props";

/*const ModalTafsir = ({ surat, tafsir }: suratProps) => {
  const [close, setClose] = useState(false);

  const closeClick = () => setClose(!close);
  return (
    <>
      {!tafsir ? (
        ""
      ) : (
        <div
          id="defaultModal"
          tabIndex={-1}
          aria-hidden="true"
          className=" overflow-y-auto flex justify-center items-center backdrop-blur-[1px] overflow-x-hidden fixed z-50 w-full md:inset-0 h-modal md:h-full"
        >
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex justify-between items-start p-4 rounded-t border-b">
                <h3 className="text-xl font-semibold">
                  {surat.name.transliteration.id}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                  data-modal-toggle="defaultModal"
                  onClick={closeClick}
                >
                  <GrClose />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed ">{surat.tafsir.id}</p>
              </div>

              <div className="flex items-center p-6 space-x-2 rounded-b border-t">
                <button
                  data-modal-toggle="defaultModal"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  I accept
                </button>
                <button
                  data-modal-toggle="defaultModal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalTafsir;
*/
