import React, { FC, MouseEventHandler } from "react";
import { Button, Tooltip } from "antd/lib";
import { PlusOutlined } from "@ant-design/icons";
import AccessControl from "@/app/components/decorators/access-control/AccessControl";

type ActionBarTypes = {
  onFiltersClick: MouseEventHandler;
  onAddProductClick: MouseEventHandler;
};

const ActionsBar: FC<ActionBarTypes> = ({
  onAddProductClick,
  onFiltersClick,
}) => {
  return (
    <div
      className={"p-2 bg-stone-700 rounded-2xl sticky top-0 z-10 gap-3 flex"}
    >
      <Tooltip title={"Add product"}>
        <AccessControl access={"seller"}>
          <Button
            onClick={onAddProductClick}
            className={
              "ovd ovd2 [&.ant-btn]:bg-green-400 hover:[&.ovd.ovd2.ant-btn]:bg-green-300 active:[&.ovd.ovd2.ant-btn]:bg-green-600"
            }
            shape="circle"
            type="primary"
            icon={<PlusOutlined />}
          />
        </AccessControl>
      </Tooltip>
      <Button onClick={onFiltersClick} shape="round" type="primary">
        Filters
      </Button>
    </div>
  );
};
export default ActionsBar;
