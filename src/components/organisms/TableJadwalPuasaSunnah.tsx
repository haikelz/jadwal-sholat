import { cx } from "classix";
import { matchDate, numBulan } from "~lib/utils/constants";
import { PuasaSunnahProps } from "~models";

export default function TableJadwalPuasaSunnah({ puasaSunnah }: PuasaSunnahProps) {
  return (
    <table className="table-fixed border-2 border-black dark:border-none">
      <thead className="border-2 border-black dark:border-none">
        <tr className="border-2 border-black dark:border-none">
          <th className="border-r-2 border-r-black px-2 text-xl dark:border-none lg:px-4">
            Tanggal
          </th>
          <th className="border-r-2 border-r-black px-2 text-xl dark:border-none lg:px-4">
            Jenis Puasa
          </th>
        </tr>
      </thead>
      <tbody>
        {puasaSunnah.map(
          (fasting, index) =>
            /**
             * Kita ingin mendapatkan hasil sesuai bulan saja
             * Jadi kita cocokkan data month dari API dengan numBulan
             */
            fasting.month === numBulan && (
              <tr
                className={cx(
                  "border-b-2 border-black",
                  "dark:border-none",
                  fasting.date === matchDate
                    ? "bg-teal-600 text-white dark:bg-teal-700"
                    : "odd:bg-teal-300 dark:odd:bg-gray-800"
                )}
                key={index + 1}
              >
                <td className="border-r-2 border-black px-2 text-xl font-medium dark:border-none lg:px-4">
                  {`${
                    fasting.date.substring(0, fasting.date.length - 2) +
                    (Number(fasting.date.substring(fasting.date.length - 2)) - 1)
                  }`}
                </td>
                <td
                  className={cx(
                    "border-r-2 border-black px-2 text-xl font-medium dark:border-none lg:px-4"
                  )}
                >
                  {fasting.type.name}
                </td>
              </tr>
            )
        )}
      </tbody>
    </table>
  );
}
