"use client";

import { MotionProps, m } from "framer-motion";
import { HTMLAttributes } from "react";

type TransitionLayoutProps = MotionProps & HTMLAttributes<HTMLDivElement>;

export default function TransitionLayout(
  { children, ...props }: TransitionLayoutProps
) {
  return <m.div {...props}>{children}</m.div>;
}
