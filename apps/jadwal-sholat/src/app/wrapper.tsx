"use client";

import { ChildrenProps } from "@/interfaces";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

export default function Wrapper({ children }: ChildrenProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider enableSystem attribute="class">
        <LazyMotion features={domAnimation}>
          <AnimatePresence initial={false} mode="wait">
            {children}
          </AnimatePresence>
        </LazyMotion>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
