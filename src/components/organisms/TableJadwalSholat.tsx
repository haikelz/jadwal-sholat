import { format } from "date-fns";
import { useAtom } from "jotai";
import { useDate } from "~hooks/useDate";
import { matchDate } from "~lib/helpers/formatDate";
import { isAutoPlayAtom } from "~store";

type WaktuProps = {
  waktu: {
    id: string;
    lokasi: string;
    date: string;
    daerah: string;
    jadwal: [
      waktu: {
        date: string;
        tanggal: string;
        imsak: string;
        subuh: string;
        terbit: string;
        dhuha: string;
        dzuhur: string;
        ashar: string;
        maghrib: string;
        isya: string;
      }
    ];
  };
  tanggal: string;
  bulan: string;
  tahun: string;
};

const tableJadwalSholatList = [
  { name: "Tanggal" },
  { name: "Imsak" },
  { name: "Subuh" },
  { name: "Terbit" },
  { name: "Dhuha" },
  { name: "Dzuhur" },
  { name: "Ashar" },
  { name: "Maghrib" },
];

const TableJadwalSholat = ({ waktu }: WaktuProps) => {
  const [isAutoPlay, setIsAutoPlay] = useAtom(isAutoPlayAtom);
  const time: string = format(useDate(), `kk.mm`);

  return (
    <>
      <audio className="hidden" id="adzan" src="/sound/adzan.mp3" controls autoPlay={isAutoPlay}>
        <track default kind="captions" />
      </audio>
      <table className="table-fixed border-2 border-black dark:border-none">
        <thead className="border-2 border-black dark:border-none">
          <tr className="border-2 border-black dark:border-none">
            {tableJadwalSholatList.map((item, index) => (
              <th
                key={index + 1}
                className="border-r-2 border-r-black px-4 text-xl dark:border-none"
              >
                {item.name}
              </th>
            ))}
            <th className="text-xl">Isya</th>
          </tr>
        </thead>
        <tbody>
          {waktu.jadwal.map((waktu, index) => {
            const dataTable = [
              { waktu: waktu.tanggal },
              { waktu: waktu.imsak },
              { waktu: waktu.subuh },
              { waktu: waktu.terbit },
              { waktu: waktu.dhuha },
              { waktu: waktu.dzuhur },
              { waktu: waktu.ashar },
              { waktu: waktu.maghrib },
              { waktu: waktu.isya },
            ];
            /**
             * Autoplay audio logic
             * @default autoplayLogic = false
             */
            const autoplayLogic: boolean =
              time === waktu.subuh ||
              time === waktu.dzuhur ||
              time === waktu.ashar ||
              time === waktu.maghrib ||
              time === waktu.isya;

            setIsAutoPlay(autoplayLogic);
            return (
              <tr
                className={`border-b-2 border-black dark:border-none ${
                  waktu.date === matchDate
                    ? "bg-teal-600 font-bold text-white dark:bg-teal-700"
                    : "odd:bg-teal-300 dark:odd:bg-gray-800"
                }`}
                key={index + 1}
              >
                {dataTable.map((item, index) => (
                  <td
                    key={index + 1}
                    className="border-r-2 border-black px-4 text-xl font-medium dark:border-none"
                  >
                    {item.waktu}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TableJadwalSholat;
