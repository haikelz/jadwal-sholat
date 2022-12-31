import { ChildrenProps } from "@/types";

const Template = ({ children }: ChildrenProps) => {
  return (
    <div className="inset-0 bg-gray-50 dark:bg-gray-900 dark:text-white md:flex">{children}</div>
  );
};

export default Template;
