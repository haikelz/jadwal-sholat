import { useScroll } from "@/src/hooks/useScroll";
import { AnimatePresence, motion } from "framer-motion";
import { MdKeyboardArrowUp } from "react-icons/md";
import { backToTopAnimation } from "@/src/utils/animation";

const BackToTop = () => {
  const [scroll] = useScroll();

  const handleClick: () => void = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const height: number = 150;

  return (
    <AnimatePresence key={height} exitBeforeEnter>
      {scroll > height && (
        <motion.div
          {...backToTopAnimation}
          className="fixed bottom-[4.3rem] right-4 md:bottom-4"
        >
          <button
            className="rounded-md bg-rose-400 p-1.5 transition duration-300 hover:bg-rose-500 dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={handleClick}
          >
            <MdKeyboardArrowUp className="text-white" size="32" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
