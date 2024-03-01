"use client";
import React, { ReactNode } from "react";

import QueryClientProvider from "@/utils/Providers/QueryClientProvider";

export default function Layout({ children }: { children: ReactNode }) {
  return <QueryClientProvider>{children}</QueryClientProvider>;
}
