import React from "react";
import { Button, Tooltip } from "antd/lib";
import { PlusOutlined } from "@ant-design/icons";

const Menu = ({ modalApi }) => {
  return (
    <div className={"p-2 bg-stone-700 rounded-2xl sticky top-0 z-10"}>
      <Tooltip title={"Add product"}>
        <Button
          onClick={() => {
            modalApi.confirm({
              title: "confirm title",
              content: "confirm content",
              onOk: () => {
                console.log("asdasdsad");
              },
            });
          }}
          className={
            "ovd ovd2 [&.ant-btn]:bg-green-400 hover:[&.ovd.ovd2.ant-btn]:bg-green-300 active:[&.ovd.ovd2.ant-btn]:bg-green-600"
          }
          shape="circle"
          type="primary"
          icon={<PlusOutlined />}
        />
      </Tooltip>
    </div>
  );
};
export default Menu;
