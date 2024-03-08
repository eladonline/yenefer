"use client";
import { ConfigProvider } from "antd/lib";
import React, { ReactElement } from "react";
import ScreenLayout from "@/app/components/layouts/ScreenLayout";
import theme from "@/app/style/antdTheme";
import { usePathname } from "next/navigation";

const AntdProvider = ({ children }: { children: ReactElement }) => {
  const pathname = usePathname();
  const authPage = ["/login", "/sign-up"].includes(pathname);
  return (
    <ConfigProvider theme={theme}>
      {authPage ? children : <ScreenLayout>{children}</ScreenLayout>}
    </ConfigProvider>
  );
};

export default AntdProvider;
