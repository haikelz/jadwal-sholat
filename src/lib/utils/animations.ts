import { Variants } from "framer-motion";

export const clickAnimation: Variants = {
  whileTap: { scale: 0.9 },
};

export const modalAnimation: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

export const layoutAnimation: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: 30, opacity: 0 },
};

export const opacityAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, animation: "ease-out" } },
  exit: { opacity: 0, transition: { duration: 0.2, animation: "ease-in" } },
};

export const backToTopAnimation: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: 40, opacity: 0 },
};
