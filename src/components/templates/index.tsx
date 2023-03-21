import { ChildrenProps } from "~types";
import { clsx } from "clsx";
import { bitter, rubik } from "~lib/utils/constants";

const Template = ({ children }: ChildrenProps) => {
  return (
    <>
      <style global jsx>
        {`
          h1 {
            font-family: ${bitter.style.fontFamily};
          }
        `}
      </style>
      <div
        className={clsx(
          "bg-gray-50",
          "md:flex",
          "dark:bg-gray-900 dark:text-white",
          rubik.className
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Template;
