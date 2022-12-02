import { NextRouter, useRouter } from "next/router";
import { IconType } from "react-icons/lib";
import { MdHomeFilled, MdListAlt, MdOutlineMoreHoriz } from "react-icons/md";
import { DarkModeIcon } from "@/components/atoms/darkModeIcon";
import { useTheme } from "@/hooks/useTheme";
import { navbarList } from "@/utils/data";
import { atom, useAtom } from "jotai";
import Others from "@/components/molecules/others";
import Link from "next/link";

const isMoreAtom = atom(false);

const BottomNav = () => {
  const [theme, setTheme] = useTheme();
  const [isMore, setIsMore] = useAtom(isMoreAtom);
  const router: NextRouter = useRouter();

  return (
    <nav className="bg-gray-50 dark:bg-gray-800 md:border-r md:border-r-gray-300 md:dark:border-r-gray-600">
      <div className="fixed bottom-0 z-50 grid w-full grid-cols-5 grid-rows-1 gap-4 border-t border-t-gray-300 bg-gray-50 py-1 pt-3 text-white dark:border-t-[1px] dark:border-t-gray-600 dark:bg-gray-800 md:sticky md:top-0 md:left-0 md:flex md:max-h-screen md:min-h-screen md:max-w-[80px] md:flex-col md:items-center md:justify-center md:gap-10 md:border-t-0 md:px-7 md:dark:border-t-0">
        <div className="flex w-full items-center justify-center">
          <Link href="/" passHref>
            <button
              className={`flex cursor-pointer flex-col items-center justify-center px-4 transition-all duration-200 ease-in-out md:p-2.5 ${
                router.pathname === "/"
                  ? "text-gray-600 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <MdHomeFilled />
              <p className="text-sm font-semibold">Home</p>
            </button>
          </Link>
        </div>
        {navbarList.map((item, index) => {
          const Icon: IconType = item.icon;
          return (
            <div key={index + 1} className="flex w-full items-center justify-center">
              <Link href={item.href} passHref>
                <button
                  className={`flex cursor-pointer flex-col items-center justify-center px-4 transition-all duration-200 ease-in-out md:p-2.5 ${
                    router.pathname.includes(item.path)
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
        <div className="hidden w-full items-center justify-center md:flex">
          <Link href="/asmaul-husna" passHref>
            <button
              className={`flex cursor-pointer flex-col items-center justify-center px-4 transition-all duration-200 ease-in-out md:p-2.5 ${
                router.pathname.includes("/asmaul-husna")
                  ? "text-gray-600 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <MdListAlt />
              <p className="text-sm font-semibold">Asma&#39;ul Husna</p>
            </button>
          </Link>
        </div>
        <DarkModeIcon flexDir="col" isHidden={true} justifyItems="center" isMarginLeft={false} />
        <div className="flex w-full items-center justify-center md:hidden">
          <button
            className="flex cursor-pointer flex-col items-center justify-center px-4 text-gray-500 dark:text-gray-400"
            onClick={() => setIsMore(!isMore)}
          >
            <MdOutlineMoreHoriz />
            <p className="text-sm font-semibold">Others</p>
          </button>
        </div>
        {isMore ? <Others /> : null}
      </div>
    </nav>
  );
};

export default BottomNav;
