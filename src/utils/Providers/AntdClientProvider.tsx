"use client";
import { ConfigProvider } from "antd/lib";
import React, { ReactElement } from "react";
import ScreenLayout from "@/app/components/layouts/ScreenLayout";
import theme from "@/app/style/antdTheme";

const AntdProvider = ({ children }: { children: ReactElement }) => {
  return (
    <ConfigProvider theme={theme}>
      <ScreenLayout>{children}</ScreenLayout>
    </ConfigProvider>
  );
};

export default AntdProvider;
