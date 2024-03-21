import { UserOutlined } from "@ant-design/icons/lib";

type SideMenuItem = {
  icon: any;
  label: string;
  key?: string;
};

type RootLayoutConfig = {
  navigationItems: { key: string; label: string }[];
  sideMenuItems: {
    [key: string]: SideMenuItem[];
  };
};

const rootLayoutConfig: RootLayoutConfig = {
  navigationItems: [
    {
      key: "",
      label: "Home",
    },
    {
      key: "settings",
      label: "Settings",
    },
  ],
  sideMenuItems: {
    "": [
      {
        icon: UserOutlined,
        label: "Products",
        key: "/products",
      },
    ],
    settings: [
      {
        icon: UserOutlined,
        label: "User",
        key: "/settings/user",
      },
    ],
  },
};

export default rootLayoutConfig;
