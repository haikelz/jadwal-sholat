import { DarkModeIcon } from "@/components/atoms/darkModeIcon";
import { NextRouter, useRouter } from "next/router";
import { MdListAlt } from "react-icons/md";
import Link from "next/link";

const Others = () => {
  const router: NextRouter = useRouter();

  return (
    <div className="fixed right-2.5 bottom-16 rounded-md bg-gray-200 p-4 shadow-md dark:bg-gray-800 md:hidden">
      <div className="flex w-full flex-col items-center justify-center">
        <DarkModeIcon flexDir="row" isHidden={false} justifyItems="start" isMarginLeft={true} />
        <div className="mt-2 flex w-full items-center justify-start">
          <Link href="/asmaul-husna" passHref>
            <button
              className={`flex cursor-pointer items-center justify-center px-4 transition-all duration-200 ease-in-out md:p-2.5 ${
                router.pathname.includes("/asmaul-husna")
                  ? "text-gray-600 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <MdListAlt />
              <p className="ml-2 text-sm font-semibold">Asma&#39;ul Husna</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Others;
