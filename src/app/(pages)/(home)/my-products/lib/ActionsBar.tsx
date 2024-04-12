import React, { FC, MouseEventHandler } from "react";
import { Button, Tooltip } from "antd/lib";
import { PlusOutlined } from "@ant-design/icons";
import AccessControl from "@/app/components/decorators/access-control/AccessControl";

const ActionsBar: FC<{ onClickAddProduct: MouseEventHandler }> = ({
  onClickAddProduct,
}) => {
  return (
    <div className={"p-2 bg-stone-700 rounded-2xl sticky top-0 z-10"}>
      <Tooltip title={"Add product"}>
        <AccessControl access={"seller"}>
          <Button
            onClick={onClickAddProduct}
            className={
              "ovd ovd2 [&.ant-btn]:bg-green-400 hover:[&.ovd.ovd2.ant-btn]:bg-green-300 active:[&.ovd.ovd2.ant-btn]:bg-green-600"
            }
            shape="circle"
            type="primary"
            icon={<PlusOutlined />}
          />
        </AccessControl>
      </Tooltip>
    </div>
  );
};
export default ActionsBar;
