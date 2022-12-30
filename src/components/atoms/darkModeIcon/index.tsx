import { useTheme } from "@/hooks/useTheme";
import { darkModeIconAnimation, whileTap } from "@/utils/animation";
import { LazyMotion, domAnimation, m } from "framer-motion";

export const DarkModeIcon = ({
  flexDir,
  isHidden,
  justifyItems,
  isMarginLeft,
}: {
  flexDir: string;
  isHidden: boolean;
  justifyItems: string;
  isMarginLeft: boolean;
}) => {
  const [theme, setTheme] = useTheme();

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={`${
          isHidden ? "hidden md:flex" : "flex"
        } w-full items-center justify-${justifyItems}`}
      >
        <m.button
          className={`flex flex-${flexDir} cursor-pointer items-center justify-center px-4 text-gray-500 dark:text-gray-400`}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "light" ? (
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
          ) : (
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
                d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"
                {...darkModeIconAnimation}
              ></m.path>
            </m.svg>
          )}
          <m.p className={`${isMarginLeft ? "ml-2" : ""} text-sm font-semibold`}>
            {theme === "light" ? "Dark" : "Light"}
          </m.p>
        </m.button>
      </m.div>
    </LazyMotion>
  );
};
