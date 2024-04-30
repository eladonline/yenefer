import React, { FC, MouseEventHandler } from "react";
import { Button, Tooltip } from "antd/lib";
import { PlusOutlined } from "@ant-design/icons";
import AccessControl from "@/app/components/decorators/access-control/AccessControl";
import {
  FiltersModal,
  NewProductModal,
} from "@/app/(pages)/(home)/my-products/lib/Modals";

const ProductsBar: FC = () => {
  return (
    <div className={"p-2 bg-stone-700 rounded sticky top-0 z-10 gap-3 flex"}>
      <Tooltip title={"Add product"}>
        <AccessControl access={"seller"}>
          <NewProductModal>
            <Button
              className={
                "ovd ovd2 [&.ant-btn]:bg-green-400 hover:[&.ovd.ovd2.ant-btn]:bg-green-300 active:[&.ovd.ovd2.ant-btn]:bg-green-600"
              }
              shape="circle"
              type="primary"
              icon={<PlusOutlined />}
            />
          </NewProductModal>
        </AccessControl>
      </Tooltip>
      <FiltersModal>
        <Button shape="round" type="primary">
          Filters
        </Button>
      </FiltersModal>
    </div>
  );
};

export default ProductsBar;
