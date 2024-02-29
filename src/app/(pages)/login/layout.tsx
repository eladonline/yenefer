import React, { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={"loading..."}>
      blaaa
      {children}
    </Suspense>
  );
}
