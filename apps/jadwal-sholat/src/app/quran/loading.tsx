import { cx } from "classix";

export default function Loading() {
  return (
    <>
      <div
        className={cx(
          "flex flex-col items-center justify-center",
          "text-center text-black",
          "dark:text-white"
        )}
      >
        <div className="w-20 h-6 bg-gray-200 animate-pulse"></div>
        <p className="mt-2 text-lg font-medium"></p>
      </div>
      <div
        className={cx(
          "grid w-full grid-cols-1 grid-rows-1 gap-4",
          "sm:grid-cols-2",
          "lg:grid-cols-3",
          "xl:grid-cols-4"
        )}
      >
        <div
          className={cx(
            "flex flex-col rounded-sm",
            "border-2 bg-gray-100 w-30 h-6 animate-pulse",
            "p-4 text-left text-black",
            "dark:border-gray-200 dark:bg-[#2A2A37] dark:text-white"
          )}
        ></div>
        <div
          className={cx(
            "flex flex-col rounded-sm",
            "border-2 bg-gray-100 w-30 h-6 animate-pulse",
            "p-4 text-left text-black",
            "dark:border-gray-200 dark:bg-[#2A2A37] dark:text-white"
          )}
        ></div>
        <div
          className={cx(
            "flex flex-col rounded-sm",
            "border-2 bg-gray-100 w-30 h-6 animate-pulse",
            "p-4 text-left text-black",
            "dark:border-gray-200 dark:bg-[#2A2A37] dark:text-white"
          )}
        ></div>
        <div
          className={cx(
            "flex flex-col rounded-sm",
            "border-2 bg-gray-100 w-30 h-6 animate-pulse",
            "p-4 text-left text-black",
            "dark:border-gray-200 dark:bg-[#2A2A37] dark:text-white"
          )}
        ></div>
        <div
          className={cx(
            "flex flex-col rounded-sm",
            "border-2 bg-gray-100 w-30 h-6 animate-pulse",
            "p-4 text-left text-black",
            "dark:border-gray-200 dark:bg-[#2A2A37] dark:text-white"
          )}
        ></div>
        <div
          className={cx(
            "flex flex-col rounded-sm",
            "border-2 bg-gray-100 w-30 h-6 animate-pulse",
            "p-4 text-left text-black",
            "dark:border-gray-200 dark:bg-[#2A2A37] dark:text-white"
          )}
        ></div>
        <div
          className={cx(
            "flex flex-col rounded-sm",
            "border-2 bg-gray-100 w-30 h-6 animate-pulse",
            "p-4 text-left text-black",
            "dark:border-gray-200 dark:bg-[#2A2A37] dark:text-white"
          )}
        ></div>
        <div
          className={cx(
            "flex flex-col rounded-sm",
            "border-2 bg-gray-100 w-30 h-6 animate-pulse",
            "p-4 text-left text-black",
            "dark:border-gray-200 dark:bg-[#2A2A37] dark:text-white"
          )}
        ></div>
      </div>
    </>
  );
}
