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
    <nav className="bg-gray-50 dark:bg-gray-800 md:border-r md:border-r-gray-300 md:dark:border-r-gray-600">
      <div className="z-50 fixed md:sticky pt-3 py-1 md:px-7 border-t md:max-h-screen md:min-h-screen border-t-gray-300 bg-gray-50 gap-4 dark:bg-gray-800 dark:border-t-[1px] md:border-t-0 md:dark:border-t-0 dark:border-t-gray-600 text-white w-full md:max-w-[80px] md:justify-center md:items-center bottom-0 md:top-0 md:left-0 grid grid-cols-5 grid-rows-1 md:flex md:flex-col md:gap-10">
        <div className="w-full flex justify-center items-center">
          <Link href="/" passHref>
            <button
              className={`flex duration-200 transition-all ease-in-out cursor-pointer flex-col px-4 md:p-2.5 justify-center items-center ${
                router.asPath === "/"
                  ? "text-gray-600 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
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
              className={`flex duration-200 transition-all ease-in-out cursor-pointer flex-col px-4 md:p-2.5 justify-center items-center ${
                router.asPath.includes("/jadwal-sholat/kota") ||
                router.asPath === "/jadwal-sholat"
                  ? "text-gray-600 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
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
              className={`flex duration-200 transition-all ease-in-out cursor-pointer flex-col px-4 md:p-2.5 justify-center items-center ${
                router.asPath === "/puasa-sunnah"
                  ? "text-gray-600 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
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
              className={`flex duration-200 transition-all ease-in-out cursor-pointer flex-col px-4 md:p-2.5 justify-center items-center ${
                router.asPath.includes("/quran/surah") ||
                router.asPath === "/quran"
                  ? "text-gray-600 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <MdBook size="20px" />
              <p className="text-sm font-semibold">Qur&#39;an</p>
            </button>
          </Link>
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            className="flex cursor-pointer flex-col px-4 justify-center items-center text-gray-500 dark:text-gray-400"
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
    </nav>
  );
};

export default BottomNav;
