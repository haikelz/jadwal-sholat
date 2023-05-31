import { cx } from "classix";
import { AnimatePresence, Variants, m } from "framer-motion";
import { memo } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useScroll } from "~hooks";

const backToTopAnimation: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: 40, opacity: 0 },
};

export function BackToTop() {
  const scroll = useScroll();
  const height = 150;

  function handleClick() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <AnimatePresence mode="wait">
      {scroll >= height ? (
        <m.div
          key={height}
          transition={{ duration: 0.3 }}
          variants={backToTopAnimation}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={cx("fixed bottom-18 right-2.5", "md:right-4 md:bottom-4")}
        >
          <button
            type="button"
            aria-label="back to top"
            className={cx(
              "rounded-md bg-rose-400 p-1.5 transition-all",
              "hover:bg-rose-500",
              "dark:bg-blue-500 dark:hover:bg-blue-600"
            )}
            onClick={handleClick}
          >
            <MdKeyboardArrowUp className="text-white" size="32" />
          </button>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

memo(BackToTop);
