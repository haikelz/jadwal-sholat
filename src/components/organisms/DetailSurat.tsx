import { cx } from "classix";
import { AnimatePresence, Variants, m } from "framer-motion";
import { nanoid } from "nanoid";
import { memo, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { shallow } from "zustand/shallow";
import { arab } from "~lib/utils/fonts";
import { SuratProps } from "~models";
import useAppStore from "~store";

const opacityAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, animation: "ease-out" } },
  exit: { opacity: 0, transition: { duration: 0.2, animation: "ease-in" } },
};

export default function DetailSurat({ surat }: SuratProps) {
  const { lastRead, setLastRead, setNotification, terjemahan, audio } = useAppStore(
    (state) => ({
      lastRead: state.lastRead,
      setLastRead: state.setLastRead,
      setNotification: state.setNotification,
      terjemahan: state.terjemahan,
      audio: state.audio,
    }),
    shallow
  );

  function saveData<T>(newData: T) {
    secureLocalStorage.setItem("surat", JSON.stringify(newData));
  }

  function handleClick(name: string, ayat: number, number: number) {
    const data = {
      id: nanoid(),
      name: name,
      ayat: ayat,
      number: number,
    };

    setNotification(true);
    setLastRead(data);
    saveData(data);
  }

  useEffect(() => {
    const element = document.getElementById(lastRead.ayat?.toString() as string);

    if (
      element &&
      lastRead.number === Number(secureLocalStorage.getItem("selected-surat") as string)
    ) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [lastRead]);

  return (
    <div className="mt-6 grid w-full grid-cols-1 grid-rows-1 gap-2 text-end">
      {surat.ayahs.map((ayat, index) => (
        <div
          className={cx(
            "mb-4 flex flex-col items-end justify-end",
            "border-b-2 border-gray-300 py-4 text-black",
            "dark:text-white"
          )}
          key={index + 1}
        >
          <div className="relative flex w-full items-start justify-between">
            <div
              id={`${ayat.number.insurah}`}
              className={cx(
                "mr-2 flex h-12 w-12 items-center justify-center rounded-full p-6",
                "border-black bg-gray-400 font-bold text-white",
                "dark:bg-teal-600"
              )}
            >
              <p className="font-bold">{ayat.number.insurah}</p>
            </div>
            <p className={cx("text-right text-4xl font-medium leading-relaxed", arab.className)}>
              {ayat.text.ar}
            </p>
          </div>
          <div className="mb-6 flex w-full flex-col items-start justify-start">
            <AnimatePresence mode="wait">
              {audio ? (
                <m.div
                  variants={opacityAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-2.5 w-full"
                >
                  <audio preload="auto" src={ayat.audio.url} controls>
                    <track default kind="captions" />
                  </audio>
                </m.div>
              ) : null}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {terjemahan ? (
                <m.p
                  variants={opacityAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-2 text-left italic text-teal-700 dark:text-teal-300"
                >
                  {ayat.text.read}
                </m.p>
              ) : null}
            </AnimatePresence>
            <p className="mt-6 text-left font-normal leading-relaxed tracking-wide">
              {ayat.translation.id}
            </p>
          </div>
          <button
            type="button"
            aria-label="tandai ayat"
            className={cx(
              "hover-animation underline-animation mt-2 font-semibold",
              "hover:text-red-500",
              "dark:hover:text-blue-500"
            )}
            onClick={() => handleClick(surat.asma.id.short, ayat.number.insurah, surat.number)}
          >
            Tandai ayat
          </button>
        </div>
      ))}
    </div>
  );
}

memo(DetailSurat);
