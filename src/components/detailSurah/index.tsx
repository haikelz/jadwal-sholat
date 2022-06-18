import { suratProps } from "src/types";

const DetailSurah = ({ surat, audio, terjemahan }: any) => {
  return (
    <div className="grid grid-cols-1 gap-2 w-full text-end grid-rows-1">
      {surat.verses.map((ayat: any, index: number) => (
        <div
          className="p-4 flex flex-col mb-4 justify-end items-end"
          key={index + 1}
        >
          <div className="flex w-full items-start justify-between">
            <div
              className={`${
                ayat.number.inSurah <= 9
                  ? "px-4 py-2"
                  : ayat.number.inSurah <= 99
                  ? "px-3.5 py-2.5"
                  : "px-3 py-3"
              } text-white font-bold border-black bg-teal-500 rounded-full flex justify-center items-center`}
            >
              <p className=" font-bold">{ayat.number.inSurah}</p>
            </div>

            <p className="text-4xl leading-relaxed">{ayat.text.arab}</p>
          </div>
          <div className="flex flex-col w-full items-start justify-start">
            {!audio ? (
              ""
            ) : (
              <div className="w-full mt-2.5">
                <audio src={ayat.audio.primary} controls></audio>
              </div>
            )}
            {!terjemahan ? (
              ""
            ) : (
              <p className="italic mt-1 text-left text-teal-700">
                {ayat.text.transliteration.en}
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
