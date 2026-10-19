"use client";

import { ChildrenProps } from "@/interfaces";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

export default function Wrapper({ children }: ChildrenProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          // Schedules, surahs and hadith barely change; reuse what was
          // fetched instead of refetching on every visit to a page.
          queries: { staleTime: 60 * 60 * 1000 },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
