import React, { ReactElement } from "react";
import { Dropdown, Avatar } from "antd/lib";
import { UserOutlined } from "@ant-design/icons";
import AuthUtility from "@/utils/Auth";
import { useRouter } from "next/navigation";

const items = (router: any) => [
  {
    key: "1",
    label: "Logout",
    onClick: () => {
      const authUtility = new AuthUtility();
      authUtility.doLogout();
      router.replace("/login");
    },
  },
];

const UserMenu: React.FC = () => {
  const router = useRouter();

  return (
    <div
      className={
        "[&>.ant-avatar.ant-avatar-circle]:bg-yellow-500 [&>.ant-avatar.ant-avatar-circle]:cursor-pointer"
      }
    >
      <Dropdown
        trigger={["click"]}
        menu={{ items: items(router) }}
        placement="bottom"
      >
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    </div>
  );
};
export default UserMenu;
