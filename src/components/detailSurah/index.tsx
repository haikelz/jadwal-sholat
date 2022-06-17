import { suratProps } from "src/types";
import { useState } from "react";
const DetailSurah = ({ surat }: suratProps) => {
  const [audio, setAudio] = useState(false);

  const audioClick = () => {};
  return (
    <div className="grid grid-cols-1 gap-2 w-full text-end grid-rows-1">
      {surat.verses.map((ayat: any, index: number) => (
        <div
          className="p-4 flex flex-col mb-4 justify-end items-end"
          key={index + 1}
        >
          <div className="flex w-full items-center justify-between">
            <div className="px-4 py-2 border-2 border-black flex justify-center items-center">
              <p className=" font-bold">{ayat.number.inSurah}</p>
            </div>

            <p className="text-4xl">{ayat.text.arab}</p>
          </div>
          <div className="w-full">
            <audio src={ayat.audio.primary} controls></audio>
          </div>
          <div className="flex justify-start mt-4 w-full">
            <p className="font-medium">{ayat.translation.id}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailSurah;
