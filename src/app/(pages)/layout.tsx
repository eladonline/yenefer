import React, { ReactElement } from "react";
import "@/app/globals.css";
import AntdProvider from "@/utils/Providers/AntdClientProvider";

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <html lang="en">
      <body>
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}
