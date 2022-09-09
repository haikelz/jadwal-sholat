import {
  MdBook,
  MdToday,
  MdDarkMode,
  MdHomeFilled,
  MdLightMode,
  MdOutlineAccessTime,
} from "react-icons/md";
import { useTheme } from "@/hooks/useTheme";
import { NextRouter, useRouter } from "next/router";
import Link from "next/link";

type ChangeTheme = () => void;

const BottomNav = () => {
  const [theme, setTheme] = useTheme();
  const router: NextRouter = useRouter();
  const changeTheme: ChangeTheme = () =>
    setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="fixed pt-3 py-1 gap-4 bg-teal-600 dark:bg-gray-800 dark:border-t-[1px] dark:border-gray-600 text-white w-full bottom-0 grid grid-cols-5 grid-rows-1">
      <div className="w-full flex justify-center items-center">
        <Link href="/" passHref>
          <button
            className={`flex cursor-pointer flex-col px-4 justify-center items-center ${
              router.asPath === "/"
                ? "text-white"
                : "text-gray-200 dark:text-gray-400"
            }`}
          >
            <MdHomeFilled size="20px" />
            <p className="text-sm font-semibold">Home</p>
          </button>
        </Link>
      </div>
      <div className="w-full flex justify-center items-center">
        <Link href="/jadwal-sholat" passHref>
          <button
            className={`flex cursor-pointer flex-col px-4 justify-center items-center ${
              router.asPath.includes("/jadwal-sholat/kota") ||
              router.asPath === "/jadwal-sholat"
                ? "text-white"
                : "text-gray-200 dark:text-gray-400"
            }`}
          >
            <MdOutlineAccessTime size="20px" />
            <p className="text-sm font-semibold">Sholat</p>
          </button>
        </Link>
      </div>

      <div className="w-full flex justify-center items-center">
        <Link href="/puasa-sunnah" passHref>
          <button
            className={`flex cursor-pointer flex-col px-4 justify-center items-center ${
              router.asPath === "/puasa-sunnah"
                ? "text-white"
                : "text-gray-200 dark:text-gray-400"
            }`}
          >
            <MdToday size="20px" />
            <p className="text-sm font-semibold">Puasa</p>
          </button>
        </Link>
      </div>

      <div className="w-full flex justify-center items-center">
        <Link href="/quran" passHref>
          <button
            className={`flex cursor-pointer flex-col px-4 justify-center items-center ${
              router.asPath.includes("/quran/surah") ||
              router.asPath === "/quran"
                ? "text-white"
                : "text-gray-200 dark:text-gray-400"
            }`}
          >
            <MdBook size="20px" />
            <p className="text-sm font-semibold">Qur&#39;an</p>
          </button>
        </Link>
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          className="flex cursor-pointer flex-col px-4 justify-center items-center text-gray-200 dark:text-gray-400"
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
    </div>
  );
};

export default BottomNav;
