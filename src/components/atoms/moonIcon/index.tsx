import { darkModeIconAnimation, whileTap } from "@/src/utils/animation";
import { m } from "framer-motion";

export const MoonIcon = () => {
  return (
    <m.svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="20px"
      width="20px"
      xmlns="http://www.w3.org/2000/svg"
      whileTap={whileTap}
    >
      <m.path fill="none" d="M0 0h24v24H0z"></m.path>
      <m.path
        d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"
        {...darkModeIconAnimation}
      ></m.path>
    </m.svg>
  );
};
