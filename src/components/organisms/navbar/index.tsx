import { useTheme } from "@/src/hooks/useTheme";
import { navbarList } from "@/src/utils/data";
import { NextRouter, useRouter } from "next/router";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IconType } from "react-icons/lib";
import Link from "next/link";

const BottomNav = () => {
  const [theme, setTheme] = useTheme();
  const router: NextRouter = useRouter();

  return (
    <nav className="bg-gray-50 dark:bg-gray-800 md:border-r md:border-r-gray-300 md:dark:border-r-gray-600">
      <div className="fixed bottom-0 z-50 grid w-full grid-cols-5 grid-rows-1 gap-4 border-t border-t-gray-300 bg-gray-50 py-1 pt-3 text-white dark:border-t-[1px] dark:border-t-gray-600 dark:bg-gray-800 md:sticky md:top-0 md:left-0 md:flex md:max-h-screen md:min-h-screen md:max-w-[80px] md:flex-col md:items-center md:justify-center md:gap-10 md:border-t-0 md:px-7 md:dark:border-t-0">
        {navbarList.map((item, index) => {
          const Icon: IconType = item.icon;
          return (
            <div key={index + 1} className="flex w-full items-center justify-center">
              <Link href={item.href} passHref>
                <button
                  className={`flex cursor-pointer flex-col items-center justify-center px-4 transition-all duration-200 ease-in-out md:p-2.5 ${
                    router.asPath === item.path || router.asPath.includes(item.path[1])
                      ? "text-gray-600 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <Icon />
                  <p className="text-sm font-semibold">{item.title}</p>
                </button>
              </Link>
            </div>
          );
        })}
        <div className="flex w-full items-center justify-center">
          <button
            className="flex cursor-pointer flex-col items-center justify-center px-4 text-gray-500 dark:text-gray-400"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "light" ? <MdDarkMode size="20px" /> : <MdLightMode size="20px" />}
            <p className="text-sm font-semibold">{theme === "light" ? "Dark" : "Light"}</p>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
