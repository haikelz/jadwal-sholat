import cx from "classix";

export default function LoadingClient() {
  const arr: Array<number> = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ];

  return (
    <>
      <div className="flex flex-col">
        <div className="relative flex items-center justify-center">
          <div className="w-[300px] animate-pulse bg-gray-300 dark:bg-gray-700 h-10 rounded-md"></div>
        </div>
        <div className="mt-1.5 hidden flex justify-center space-x-4 items-center">
          <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-4 w-[70px]"></div>
          <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-4 w-[70px]"></div>
        </div>
      </div>
      <div className="w-full flex justify-end items-center">
        <div
          className={cx(
            "flex px-2 py-1 justify-center animate-pulse w-[160px] h-7 rounded-md",
            "dark:text-white items-center bg-gray-300 dark:bg-gray-700"
          )}
        ></div>
      </div>
      <div
        className={cx(
          "grid w-full grid-cols-1 grid-rows-1 gap-5 text-center",
          "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        )}
      >
        {arr.map((item) => (
          <div
            key={item}
            data-cy="card"
            className={cx(
              "flex flex-col items-start justify-center",
              "overflow-hidden rounded-md text-left",
              "border-2 border-black animate-pulse bg-gray-100 p-4",
              "text-start tracking-wide cursor-pointer",
              "dark:border-white dark:bg-[#2A2A37]"
            )}
          >
            <div className="p-3 animate-pulse bg-gray-300 dark:bg-gray-700"></div>
            <div className="my-3 flex w-full justify-end">
              <div
                className={cx(
                  "animate-pulse w-[100px] p-3 bg-gray-300 dark:bg-gray-700"
                )}
              ></div>
            </div>
            <div className="p-3 w-[100px] animate-pulse bg-gray-300 dark:bg-gray-700"></div>
            <div className="p-3 mt-2 w-[200px] animate-pulse bg-gray-300 dark:bg-gray-700"></div>
          </div>
        ))}
      </div>
    </>
  );
}
