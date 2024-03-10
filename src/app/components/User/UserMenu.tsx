import React, { ReactElement } from "react";
import { Dropdown, Avatar } from "antd/lib";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import AuthUtility from "@/utils/Auth";

const items = [
  {
    key: "1",
    label: (
      <div
        onClick={() => {
          const authUtility = new AuthUtility();
          authUtility.doLogout();
        }}
      >
        <Link href={"/login"} replace>
          Logout
        </Link>
      </div>
    ),
  },
];

const UserMenu: React.FC = () => {
  return (
    <div
      className={
        "[&>.ant-avatar.ant-avatar-circle]:bg-yellow-500 [&>.ant-avatar.ant-avatar-circle]:cursor-pointer"
      }
    >
      <Dropdown trigger={["click"]} menu={{ items }} placement="bottom">
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    </div>
  );
};
export default UserMenu;
