"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ChildrenProps } from "~interfaces";

export default function Wrapper({ children }: ChildrenProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider enableSystem attribute="class">
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
