import { Variants } from "framer-motion";

export const clickAnimation: Variants = {
  whileTap: { scale: 0.9 },
};

export const modalAnimation: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};
