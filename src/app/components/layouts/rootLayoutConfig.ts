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
        label: "Tasks Management",
        key: "/tasks",
      },
    ],
    settings: [
      {
        icon: UserOutlined,
        label: "Forms",
        key: "/settings/forms",
      },
    ],
  },
};

export default rootLayoutConfig;
