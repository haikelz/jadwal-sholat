import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useScroll } from "~hooks/useScroll";

const backToTopAnimation = {
  transition: { duration: 0.3 },
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 40, opacity: 0 },
};

export const BackToTop = () => {
  const scroll: number = useScroll();
  const height: number = 150;

  const handleClick: () => void = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence key={height} mode="wait">
      {scroll >= height ? (
        <motion.div
          {...backToTopAnimation}
          className="fixed bottom-16 right-2.5 md:right-4 md:bottom-4"
        >
          <button
            type="button"
            className={clsx(
              "rounded-md bg-rose-400 p-1.5 transition ease-in-out",
              "hover:bg-rose-500 dark:bg-blue-500 dark:hover:bg-blue-600"
            )}
            onClick={handleClick}
          >
            <MdKeyboardArrowUp className="text-white" size="32" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

memo(BackToTop);
