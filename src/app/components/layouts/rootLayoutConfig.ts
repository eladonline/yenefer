import { UserOutlined } from "@ant-design/icons/lib";

type SideMenuItem = {
  icon: any;
  label: string;
  key?: "default";
};

type RootLayoutConfig = {
  navigationItems: Array<string>;
  sideMenuItems: {
    [key: string]: SideMenuItem[];
  };
};

const rootLayoutConfig: RootLayoutConfig = {
  navigationItems: ["Home", "Settings"],
  sideMenuItems: {
    home: [
      {
        icon: UserOutlined,
        label: "Tasks",
        key: "default",
      },
    ],
    settings: [
      {
        icon: UserOutlined,
        label: "Forms",
        key: "default",
      },
    ],
  },
};

export default rootLayoutConfig;
