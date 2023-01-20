export const appAnimation = {
  transition: { duration: 0.3 },
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 30, opacity: 0 },
};

export const backToTopAnimation = {
  transition: { duration: 0.3 },
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 40, opacity: 0 },
};

export const whileTap = {
  scale: 0.95,
  rotate: 15,
};

export const darkModeIconAnimation = {
  transition: { type: "spring", stiffness: 200, damping: 10 },
  initial: { opacity: 0.6, rotate: 90 },
  animate: { opacity: 1, rotate: 0 },
  whileTap: whileTap,
};
