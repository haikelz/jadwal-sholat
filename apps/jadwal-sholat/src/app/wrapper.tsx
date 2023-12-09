"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ChildrenProps } from "~interfaces";

export default function Wrapper({ children }: ChildrenProps) {
  const queryClient: QueryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider enableSystem attribute="class">
        <ReactLenis root>{children}</ReactLenis>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
