// Animation
export const clickAnimation = {
  whileTap: { scale: 0.9 },
};

export const layoutAnimation = {
  transition: { duration: 0.3 },
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 30, opacity: 0 },
};

export const modalAnimation = {
  initial: { opacity: 0, scale: 0.75 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2, animation: "ease-out" } },
  exit: { opacity: 0, scale: 0, transition: { duration: 0.2, animation: "ease-in" } },
};

export const opacityAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, animation: "ease-out" } },
  exit: { opacity: 0, transition: { duration: 0.2, animation: "ease-in" } },
};

export const backToTopAnimation = {
  transition: { duration: 0.3 },
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 40, opacity: 0 },
};
