import React, { ReactElement } from "react";
import "@/app/globals.css";
import AntdProvider from "@/utils/Providers/AntdClientProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function RootLayout(props: { children: ReactElement }) {
  return (
    <html lang="en">
      <body className={"m-0 min-h-[100vh]"}>
        <AntdProvider>
          <AntdRegistry>{props.children}</AntdRegistry>
        </AntdProvider>
      </body>
    </html>
  );
}
