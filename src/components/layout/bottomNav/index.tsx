import {
  MdBook,
  MdToday,
  MdDarkMode,
  MdHomeFilled,
  MdLightMode,
  MdOutlineAccessTime,
} from "react-icons/md";
import { useTheme } from "src/hooks/useTheme";
import Link from "next/link";

const BottomNav = () => {
  const [theme, setTheme] = useTheme();
  const changeTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const button =
    "flex cursor-pointer flex-col px-4 dark:hover:text-white dark:text-gray-400 text-gray-200 hover:text-white justify-center items-center";

  return (
    <div className="fixed pt-3 py-1 gap-4 bg-teal-600 dark:bg-gray-800 dark:border-t-[1px] dark:border-gray-600 text-white w-full bottom-0 grid grid-cols-5 grid-rows-1">
      <div className="w-full flex justify-center items-center">
        <Link href="/" passHref>
          <button className={button}>
            <MdHomeFilled size="20px" />
            <p className="text-sm font-semibold">Home</p>
          </button>
        </Link>
      </div>
      <div className="w-full flex justify-center items-center">
        <Link href="/jadwal-sholat" passHref>
          <button className={button}>
            <MdOutlineAccessTime size="20px" />
            <p className="text-sm font-semibold">Sholat</p>
          </button>
        </Link>
      </div>
      <div className="w-full flex justify-center items-center">
        <Link href="/puasa-sunnah" passHref>
          <button className={button}>
            <MdToday size="20px" />
            <p className="text-sm font-semibold">Puasa</p>
          </button>
        </Link>
      </div>
      <div className="w-full flex justify-center items-center">
        <Link href="/quran" passHref>
          <button className={button}>
            <MdBook size="20px" />
            <p className="text-sm font-semibold">Qur&#39;an</p>
          </button>
        </Link>
      </div>
      <div className="w-full flex justify-center items-center">
        <button className={button} onClick={changeTheme}>
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
