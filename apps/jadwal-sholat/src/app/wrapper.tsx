"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { ChildrenProps } from "~interfaces";

export default function Wrapper({ children }: ChildrenProps) {
  const queryClient: QueryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider enableSystem attribute="class">
        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </LazyMotion>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
