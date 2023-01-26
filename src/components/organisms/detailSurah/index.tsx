import { opacityAnimation } from "@/lib/utils/animation";
import { arab } from "@/lib/utils/fonts";
import { lastReadAtom } from "@/store";
import { SuratProps } from "@/types";
import { AnimatePresence, m } from "framer-motion";
import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import { twJoin, twMerge } from "tailwind-merge";

const DetailSurah = ({ surat, audio, terjemahan, dispatchNotification }: SuratProps) => {
  const [, setLastRead] = useAtom(lastReadAtom);

  const saveData = <T,>(newData: T) => {
    localStorage.setItem("surah", JSON.stringify(newData));
  };

  const handleClick = (name: string, ayat: number, number: number) => {
    const data = { id: nanoid(), name: name, ayat: ayat, number: number };
    setLastRead(data);

    dispatchNotification({ type: "notification" });
    saveData(data);
  };

  return (
    <div className="mt-6 grid w-full grid-cols-1 grid-rows-1 gap-2 text-end">
      {surat.ayahs.map((ayat, index) => (
        <div
          className={twJoin(
            "mb-4 flex flex-col items-end justify-end",
            "border-b-2 border-gray-300 py-4"
          )}
          key={index + 1}
        >
          <div className="relative flex w-full items-start justify-between">
            <div
              id={ayat.number.insurah.toString()}
              className={twJoin(
                "mr-2 flex h-12 w-12 items-center justify-center rounded-full p-4",
                "border-black bg-gray-400 font-bold text-white dark:bg-teal-600"
              )}
            >
              <p className="font-bold">{ayat.number.insurah}</p>
            </div>
            <p className={twMerge("text-4xl font-medium leading-relaxed", arab.className)}>
              {ayat.text.ar}
            </p>
          </div>
          <div className="flex w-full flex-col items-start justify-start">
            <AnimatePresence mode="wait">
              {audio ? (
                <m.div {...opacityAnimation} className="mt-2.5 w-full">
                  <audio preload="auto" src={ayat.audio.url} controls>
                    <track default kind="captions" />
                  </audio>
                </m.div>
              ) : null}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {terjemahan ? (
                <m.p
                  {...opacityAnimation}
                  className="mt-2 text-left italic text-teal-700 dark:text-teal-300"
                >
                  {ayat.text.read}
                </m.p>
              ) : null}
            </AnimatePresence>
            <p className="text-md mt-2 text-left font-medium leading-relaxed tracking-wide">
              {ayat.translation.id}
            </p>
          </div>
          <button
            className={twJoin(
              "hover-animation underline-animation mt-2 font-semibold",
              "hover:text-red-500  dark:hover:text-blue-500"
            )}
            onClick={() => handleClick(surat.asma.id.short, ayat.number.insurah, surat.number)}
          >
            Tandai ayat
          </button>
        </div>
      ))}
    </div>
  );
};

export default DetailSurah;
