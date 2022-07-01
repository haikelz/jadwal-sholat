import { useEffect, useState } from "react";
import {
  MdBook,
  MdDarkMode,
  MdHomeFilled,
  MdLightMode,
  MdOutlineAccessTime,
} from "react-icons/md";
import Link from "next/link";
import { useTheme } from "next-themes";

const BottomNav = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const changeTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    setMounted(true);
  });

  if (!mounted) {
    return null;
  }
  return (
    <div className="fixed pt-3 py-1 gap-4 bg-teal-600 text-white w-full bottom-0 grid grid-cols-4 grid-rows-1">
      <Link href="/">
        <div className="flex cursor-pointer flex-col px-4 justify-center items-center">
          <MdHomeFilled size="20px" />
          <p className="text-sm font-semibold">Home</p>
        </div>
      </Link>
      <Link href="/jadwal-sholat">
        <div className="flex cursor-pointer flex-col px-2 justify-center items-center">
          <MdOutlineAccessTime size="20px" />
          <p className="text-sm font-semibold">Sholat</p>
        </div>
      </Link>
      <Link href="/quran">
        <div className="flex cursor-pointer flex-col px-4 justify-center items-center">
          <MdBook size="20px" />
          <p className="text-sm font-semibold">Al-Qur&#39;an</p>
        </div>
      </Link>
      <button
        className="flex cursor-pointer flex-col px-4 justify-center items-center"
        onClick={changeTheme}
      >
        {theme === "light" ? (
          <MdDarkMode size="20px" />
        ) : (
          <MdLightMode size="20px" />
        )}
        <p className="text-sm font-semibold">
          {theme === "light" ? "Dark" : "Light"}
        </p>
      </button>
    </div>
  );
};

export default BottomNav;
