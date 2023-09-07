"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChildrenProps } from "~interfaces";

export default function Wrapper({ children }: ChildrenProps) {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
