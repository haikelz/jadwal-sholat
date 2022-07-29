import { Surat } from "src/props";

const DetailSurah = ({ surat, audio, terjemahan }: Surat) => {
  return (
    <div className="grid grid-cols-1 mt-6 gap-2 w-full text-end grid-rows-1">
      {surat.ayahs.map((ayat, index: number) => (
        <div
          className="p-4 border-b-2 border-teal-300 flex flex-col mb-4 justify-end items-end"
          key={index + 1}
        >
          <div className="flex w-full relative items-start justify-between">
            <div
              className={`${
                ayat.number.insurah <= 9
                  ? "px-4 py-2"
                  : ayat.number.insurah <= 99
                  ? "px-3.5 py-2.5"
                  : "px-3 py-3"
              } text-white font-bold border-black bg-teal-500 dark:bg-teal-600 rounded-full flex justify-center items-center`}
            >
              <p className=" font-bold">{ayat.number.insurah}</p>
            </div>
            <p className="text-4xl leading-relaxed">{ayat.text.ar}</p>
          </div>
          <div className="flex flex-col w-full items-start justify-start">
            {audio && (
              <div className="w-full mt-2.5">
                <audio src={ayat.audio.url} controls></audio>
              </div>
            )}
            {terjemahan && (
              <p className="italic mt-1 text-left text-teal-700 dark:text-teal-300">
                {ayat.text.read}
              </p>
            )}
            <p className="font-medium mt-2 text-md text-left tracking-wide leading-relaxed">
              {ayat.translation.id}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailSurah;
