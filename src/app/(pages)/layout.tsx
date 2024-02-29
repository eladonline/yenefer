"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry/lib";
import { Layout, Menu } from "antd/lib";
import React, { Suspense } from "react";
import QueryClientProvider from "@/utils/Providers/QueryClientProvider";
import rootLayoutConfig from "./rootLayoutConfig";
const { Header, Content, Sider } = Layout;
import "@/app/globals.css";

const navbarItems = rootLayoutConfig.navigationItems.map((key) => ({
  key,
  label: key,
}));

const sideMenuItems = rootLayoutConfig.sideMenuItems.map(
  ({ icon, label, children }, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label,
      children,
    };
  },
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Layout className={"h-[100vh]"}>
            <Header className={"flex items-center"}>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                items={navbarItems}
                className={"flex-1"}
              />
            </Header>
            <Layout>
              <Sider width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%", borderRight: 0 }}
                  items={sideMenuItems}
                />
              </Sider>
              <Layout style={{ padding: "0 24px 24px" }}>
                <Content className={"bg-snow p-3"}>
                  <Suspense fallback={<div>wait</div>}>
                    <QueryClientProvider>{children}</QueryClientProvider>
                  </Suspense>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
