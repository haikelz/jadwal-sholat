/**
  TODO: Add Bookmark Feature

  import { DaftarSurah } from "@/src/interfaces";
import { listSavedSurahAtom } from "@/src/store";
import { atom, useAtom } from "jotai";
import { memo, useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/atoms/searchBar";
import TidakAda from "@/components/atoms/tidakAda";
import reactStringReplace from "react-string-replace";
import { MdBookmark } from "react-icons/md";

const isSurahAtom = atom(true);

const ListSurah = ({ surah }: DaftarSurah) => {
  const [listSavedSurah, setListSavedSurah] = useAtom(listSavedSurahAtom);
  const [isSurah, setIsSurah] = useAtom(isSurahAtom);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSurah = surah.filter((value) => {
    if (searchTerm === "") {
      return value;
    } else if (
      value.asma.id.short.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return value;
    }
  });

  const saveData = (data) => {
    localStorage.setItem("surah", JSON.stringify(data));
  };

  const bookmarkSurah = (surahName: string, id: number) => {
    const data = [...listSavedSurah];
    data.push({ name: surahName, id: id });

    setListSavedSurah(data);
    console.log(data);
  };

  const surahClick = () => {
    setIsSurah(true);
  };

  const savedClick = () => {
    setIsSurah(false);
  };

  const deleteBookmark = (surahNumber) => {
    const data = [...listSavedSurah];

    const filteredData = data.filter((value) => {
      if (value.id === surahNumber) return false;
      else return true;
    });

    setListSavedSurah(filteredData);
  };

  return (
    <>
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="flex gap-3 font-semibold">
        <button
          className="py-1 px-3 bg-gray-300 hover:bg-gray-400 text-lg rounded-[5px]"
          onClick={surahClick}
        >
          Surah
        </button>
        <button
          className="py-1 px-3 bg-gray-300 hover:bg-gray-400 text-lg rounded-[5px]"
          onClick={savedClick}
        >
          Saved
        </button>
      </div>
      {isSurah ? (
        filteredSurah.length ? (
          <div className="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-1 gap-4 w-full">
            {filteredSurah.map((surat) => (
              <div className="flex flex-col text-left cursor-pointer p-4 rounded-sm bg-gray-100 dark:bg-[#2A2A37] border-2 border-black dark:border-white">
                <Link href={`/quran/surah/${surat.number}`}>
                  <div>
                    <p className="text-right font-semibold tracking-wide">
                      {surat.type.id}
                    </p>
                    <h1 className="font-bold text-xl">{surat.number}</h1>
                    <p className="font-bold text-lg">
                      {searchTerm
                        ? reactStringReplace(
                            surat.asma.id.short,
                            searchTerm,
                            (match: string, index: number) => (
                              <span
                                key={index++}
                                className="bg-lime-400 dark:bg-lime-600"
                              >
                                {match}
                              </span>
                            )
                          )
                        : surat.asma.id.short}
                    </p>
                    <p className="font-medium">{surat.asma.translation.id}</p>
                    <p>Jumlah: {surat.ayahCount} ayat</p>
                  </div>
                </Link>
                <button
                  className="text-white mt-2 bg-teal-600 hover:bg-teal-700 dark:bg-blue-500 dark:hover:bg-blue-600 duration-200 transition py-1 rounded-sm font-bold"
                  onClick={() =>
                    bookmarkSurah(surat.asma.id.short, surat.number)
                  }
                >
                  Bookmark
                </button>
              </div>
            ))}
          </div>
        ) : (
          <TidakAda title="Surah" />
        )
      ) : listSavedSurah.length ? (
        listSavedSurah.map((value) => (
          <Link href={`/quran/surah/${value.id}`}>
            <div className="border-2">
              <p>Surat {value.name}</p>
              <button onClick={() => deleteBookmark(value.id)}>Delete</button>
            </div>
          </Link>
        ))
      ) : (
        <p>Tidak ada</p>
      )}
    </>
  );
};

export default memo(ListSurah);
 */
export {};
