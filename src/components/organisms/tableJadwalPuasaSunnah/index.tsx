import { PuasaSunnah } from "@/src/interfaces";
import { numBulan, matchDate } from "@/utils/date";

const TableJadwalPuasaSunnah = ({ puasaSunnah }: PuasaSunnah) => {
  return (
    <table className="border-2 border-black  dark:border-none table-fixed">
      <thead className="border-2 border-black dark:border-none">
        <tr className="border-2 border-black dark:border-none">
          <th className="border-r-2 border-r-black dark:border-none text-xl px-4">
            Tanggal
          </th>
          <th className="border-r-2 border-r-black dark:border-none text-xl px-4">
            Jenis Puasa
          </th>
        </tr>
      </thead>
      <tbody>
        {puasaSunnah.map(
          (fasting, index: number) =>
            /* Kita ingin mendapatkan hasil sesuai bulan saja, jadi kita cocokkan data month dari API dengan numBulan */
            fasting.month === numBulan && (
              <tr
                className={`border-black dark:border-none border-b-2 ${
                  fasting.date === matchDate
                    ? "dark:bg-teal-700 bg-teal-600 text-white font-bold"
                    : "dark:odd:bg-gray-800 odd:bg-teal-300"
                }`}
                key={index + 1}
              >
                <td className="border-r-2 font-medium border-black dark:border-none px-4 text-xl">
                  {fasting.date}
                </td>
                <td className="border-r-2 font-medium border-black dark:border-none px-4 text-xl">
                  {fasting.type.name}
                </td>
              </tr>
            )
        )}
      </tbody>
    </table>
  );
};

export default TableJadwalPuasaSunnah;
