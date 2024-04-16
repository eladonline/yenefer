import React, { ReactElement } from "react";
import "@/app/globals.css";
import AntdProvider from "@/utils/Providers/AntdClientProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Metadata } from "next";
import dbConnect from "@/app/(server)/services/mongooseDB";
import QueryClientProvider from "@/utils/Providers/QueryClientProvider";
import AccessControlProvider from "@/utils/Providers/AccessControl";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

await (async () => dbConnect().catch((err) => console.error(err.stack)))();

export const metadata: Metadata = {
  title: "Yenefer",
  description: "Powered by a Witcher",
};

export default function RootLayout(props: { children: ReactElement }) {
  const cookiesPayload = cookies();
  const token = cookiesPayload.get("token")?.value;

  const info = jwt.decode(token as string, { json: true });

  return (
    <html lang="en">
      <body className={"m-0 min-h-[100vh]"}>
        <AntdRegistry>
          <AntdProvider>
            <AccessControlProvider license={info?.license}>
              <QueryClientProvider>{props.children}</QueryClientProvider>
            </AccessControlProvider>
          </AntdProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
