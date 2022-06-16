import Link from "next/link";
import { FiHome, FiClock, FiBook } from "react-icons/fi";

const BottomNav = () => {
  return (
    <div className="fixed gap-4 bg-sky-600 w-full bottom-0 py-2 grid grid-cols-3 grid-rows-1">
      <Link href="/">
        <div className="flex cursor-pointer flex-col px-4 justify-center items-center">
          <FiHome size="25px" />
          <p>Home</p>
        </div>
      </Link>
      <Link href="/jadwal-sholat">
        <div className="flex cursor-pointer flex-col px-2 justify-center items-center">
          <FiClock size="25px" />
          <p>Sholat</p>
        </div>
      </Link>
      <Link href="/quran">
        <div className="flex cursor-pointer flex-col px-4 justify-center items-center">
          <FiBook size="25px" />
          Baca Qur'an
        </div>
      </Link>
    </div>
  );
};

export default BottomNav;
