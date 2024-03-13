import React, { ReactElement } from "react";
import { Layout, Menu } from "antd/lib";
import { useRouter, usePathname } from "next/navigation";
import rootLayoutConfig from "./rootLayoutConfig";
import UserMenu from "@/app/components/User/UserMenu";
const { Header, Content, Sider } = Layout;

const navbarItems = rootLayoutConfig.navigationItems.map((key, i) => ({
  key,
  label: key,
}));

const sideMenuItems = rootLayoutConfig.sideMenuItems.map(
  ({ icon, label, children }, index) => {
    return {
      key: label.toLowerCase(),
      icon: React.createElement(icon),
      label,
      children,
    };
  },
);
const ScreenLayout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const pathName = usePathname();

  const translatePathNameToKeys = (pathName: string): string => {
    if (pathName === "/") return "Home";
    return pathName.charAt(1).toUpperCase() + pathName.substring(2);
  };

  return (
    <Layout className={"h-[100vh]"}>
      <Header className={"flex items-center"}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[translatePathNameToKeys(pathName)]}
          items={navbarItems}
          onSelect={({ key }: { key: string }) => {
            if (key === "Home") return router.replace("/");
            return router.replace(`/${key.toLowerCase()}`);
          }}
          className={"flex-1"}
        />
        <UserMenu />
      </Header>
      <Layout>
        <Sider width={200} breakpoint="lg" collapsedWidth="0">
          <Menu
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
            items={sideMenuItems}
          />
        </Sider>
        <Layout>
          <Content className={"bg-snow p-3"}>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ScreenLayout;
