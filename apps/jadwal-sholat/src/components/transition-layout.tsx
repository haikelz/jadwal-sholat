"use client";

import { MotionProps, m, useReducedMotion } from "framer-motion";
import { HTMLAttributes } from "react";

type TransitionLayoutProps = MotionProps & HTMLAttributes<HTMLDivElement>;

export function TransitionLayout({
  children,
  initial,
  animate,
  transition,
  ...props
}: TransitionLayoutProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      {...props}
      initial={shouldReduceMotion ? false : initial}
      animate={shouldReduceMotion ? undefined : animate}
      transition={shouldReduceMotion ? { duration: 0 } : transition}
    >
      {children}
    </m.div>
  );
}
