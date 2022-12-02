import { asmaulHusna } from "@/utils/data";
import { useState } from "react";
import { SearchBar } from "@/components/atoms/searchBar";
import { TidakAda } from "@/components/atoms/tidakAda";

const ListAsmaulHusna = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAsmaulHusna = asmaulHusna.filter((value) => {
    if (searchTerm === "") {
      return value;
    } else if (value.latin.toLowerCase().includes(searchTerm.toLowerCase())) {
      return value;
    }
  });

  return (
    <>
      <SearchBar setSearchTerm={setSearchTerm} />
      {filteredAsmaulHusna.length ? (
        <div className="grid w-full grid-cols-1 grid-rows-1 gap-5 text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredAsmaulHusna.map((item) => (
            <div
              key={item.urutan}
              className="flex flex-col items-start justify-center overflow-hidden rounded-sm border-2 border-black bg-gray-100 p-4 text-start tracking-wide transition-all ease-in-out active:scale-95 dark:border-white dark:bg-[#2A2A37]"
            >
              <h3 className="text-xl font-bold">{item.urutan}</h3>
              <div className="my-3 w-full text-right">
                <p className="font-arab text-3xl font-bold">{item.arab}</p>
              </div>
              <p className="font-medium">{item.latin}</p>
              <p>{item.arti}</p>
            </div>
          ))}
        </div>
      ) : (
        <TidakAda title="Asma'ul Husna" />
      )}
    </>
  );
};

export default ListAsmaulHusna;
