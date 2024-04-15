import React, { ReactElement } from "react";
import { Layout, Menu } from "antd/lib";
import { useRouter, usePathname } from "next/navigation";
import rootLayoutConfig from "./rootLayoutConfig";
import UserMenu from "@/app/components/User/UserMenu";

const { Header, Content, Sider } = Layout;

const navbarItems = rootLayoutConfig.navigationItems;

const ScreenLayout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const pathName = usePathname();

  const [topMenuKey, subMenu] = pathName.split("/");
  const selectedTopKey = rootLayoutConfig.navigationItems.find(
    ({ key }) => key === subMenu,
  )
    ? subMenu
    : topMenuKey;

  const sideMenuItems = rootLayoutConfig.sideMenuItems[selectedTopKey] || [];

  return (
    <Layout className={"h-[100vh]"}>
      <Header className={"flex items-center"}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedTopKey]}
          items={navbarItems}
          onClick={({ key }: { key: string }) => {
            router.push(key ? `/${key}` : "/");
          }}
          className={"flex-1"}
        />
        <UserMenu />
      </Header>
      <Layout>
        <Sider width={200} breakpoint="lg" collapsedWidth="0">
          <Menu
            style={{ height: "100%", borderRight: 0 }}
            selectedKeys={[pathName]}
            onSelect={({ key }: { key: string }) => router.replace(key)}
            items={[
              ...sideMenuItems.map(({ icon, label, key }) => {
                return {
                  key: key || label.toLowerCase(),
                  icon: React.createElement(icon),
                  label,
                };
              }),
            ]}
          />
        </Sider>
        <Layout>
          <Content className={"bg-snow p-3 overflow-auto"}>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ScreenLayout;
