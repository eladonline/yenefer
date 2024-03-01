"use client";
import { ConfigProvider } from "antd/lib";
import React, { ReactElement } from "react";
import ScreenLayout from "@/app/components/Layouts/ScreenLayout";

const AntdProvider = ({ children }: { children: ReactElement }) => {
  return (
    <ConfigProvider>
      <ScreenLayout>{children}</ScreenLayout>
    </ConfigProvider>
  );
};

export default AntdProvider;
