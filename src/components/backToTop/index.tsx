import { useScroll } from "src/hooks/useScroll";
import { motion } from "framer-motion";
import { MdKeyboardArrowUp } from "react-icons/md";
import { backToTopAnimation } from "src/utils/animation";
import Link from "next/link";

const BackToTop = () => {
  const [scroll] = useScroll();

  return (
    <>
      {scroll > 50 && (
        <motion.div
          {...backToTopAnimation}
          className="fixed bottom-20 right-6 hidden md:flex"
        >
          <Link href="#top" passHref>
            <button className="bg-rose-400 hover:bg-rose-500 dark:bg-blue-500 dark:hover:bg-blue-600 duration-300 rounded-md transition p-2">
              <MdKeyboardArrowUp className="text-white" size="30" />
            </button>
          </Link>
        </motion.div>
      )}
    </>
  );
};

export default BackToTop;
