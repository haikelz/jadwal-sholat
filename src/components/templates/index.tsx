import { bitter, rubik } from "~lib/utils/fonts";
import { ChildrenProps } from "~types";
import { twMerge } from "tailwind-merge";

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
        className={twMerge(
          "inset-0 bg-gray-50",
          "dark:bg-gray-900 dark:text-white md:flex",
          rubik.className
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Template;
