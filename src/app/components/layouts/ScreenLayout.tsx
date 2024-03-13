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

const ScreenLayout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const pathName = usePathname();

  const translatePathNameToKeys = (pathName: string): string => {
    if (pathName === "/") return "Home";
    return pathName.charAt(1).toUpperCase() + pathName.substring(2);
  };

  const pathNameAsMenuKey = translatePathNameToKeys(pathName);
  const pathNameAsSideMenuKey = pathNameAsMenuKey.toLowerCase();

  const sideMenuItems =
    rootLayoutConfig.sideMenuItems[pathNameAsSideMenuKey] || [];

  return (
    <Layout className={"h-[100vh]"}>
      <Header className={"flex items-center"}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathNameAsMenuKey]}
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
            style={{ height: "100%", borderRight: 0 }}
            defaultSelectedKeys={["default"]}
            items={sideMenuItems.map(({ icon, label, key }) => {
              return {
                key: key || label.toLowerCase(),
                icon: React.createElement(icon),
                label,
              };
            })}
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
