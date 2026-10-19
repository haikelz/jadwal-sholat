"use client";

import { HTMLMotionProps, m } from "motion/react";

// MotionConfig reducedMotion="user" in the wrapper drops the transform and
// keeps the fade for people who prefer reduced motion.
export function TransitionLayout(props: HTMLMotionProps<"div">) {
  return <m.div {...props} />;
}
