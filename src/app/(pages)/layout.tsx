import React, { ReactElement } from "react";
import "@/app/globals.css";
import AntdProvider from "@/utils/Providers/AntdClientProvider";

export default function RootLayout(props: { children: ReactElement }) {
  return (
    <html lang="en">
      <body className={"m-0"}>
        <AntdProvider>{props.children}</AntdProvider>
      </body>
    </html>
  );
}
