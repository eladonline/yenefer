import { UserOutlined } from "@ant-design/icons/lib";

type SideMenuItem = {
  icon: any;
  label: string;
  children: { key: string; label: string }[];
};

type RootLayoutConfig = {
  navigationItems: Array<string>;
  sideMenuItems: SideMenuItem[];
};

const rootLayoutConfig: RootLayoutConfig = {
  navigationItems: ["Home", "Settings"],
  sideMenuItems: [
    {
      icon: UserOutlined,
      label: "Posts",
      children: [{ key: "settings", label: "My posts" }],
    },
  ],
};

export default rootLayoutConfig;
