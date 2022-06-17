import { FiHome, FiClock, FiBook } from "react-icons/fi";
import Link from "next/link";

const BottomNav = () => {
  return (
    <div className="fixed pt-3 py-1 gap-4 bg-rose-400 w-full bottom-0 grid grid-cols-3 grid-rows-1">
      <Link href="/">
        <div className="flex cursor-pointer flex-col px-4 justify-center items-center">
          <FiHome size="20px" />
          <p className="text-sm font-semibold">Home</p>
        </div>
      </Link>
      <Link href="/jadwal-sholat">
        <div className="flex cursor-pointer flex-col px-2 justify-center items-center">
          <FiClock size="20px" />
          <p className="text-sm font-semibold">Sholat</p>
        </div>
      </Link>
      <Link href="/quran">
        <div className="flex cursor-pointer flex-col px-4 justify-center items-center">
          <FiBook size="20px" />
          <p className="text-sm font-semibold">Baca Qur'an</p>
        </div>
      </Link>
    </div>
  );
};

export default BottomNav;
