import { NotificationProps } from "@/types";
import clsx from "clsx";
import { memo } from "react";

const Notification = ({ dispatchNotification }: NotificationProps) => {
  return (
    <div
      tabIndex={-1}
      aria-hidden={true}
      className={clsx(
        "fixed inset-0 top-0 z-50 flex min-h-screen w-full items-center justify-center",
        "overflow-y-auto overflow-x-hidden text-black backdrop-blur-[3px]"
      )}
    >
      <div className="relative md:h-auto">
        <div className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 dark:text-white">
          <div className="flex flex-col items-center justify-between rounded-t p-4">
            <p className="text-2xl font-bold">Sudah ditandai!</p>
            <button
              className={clsx(
                "mt-2 inline-flex items-center rounded-md bg-transparent bg-blue-500 py-1.5 px-4",
                "font-semibold text-white shadow-md",
                "hover:bg-gray-200 hover:text-black dark:hover:text-black"
              )}
              onClick={() => dispatchNotification({ type: "notification" })}
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Notification);
