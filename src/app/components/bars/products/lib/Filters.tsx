import React, { FC } from "react";
import productsConfig from "@/app/(pages)/(home)/my-products/lib/config.json";
import { Checkbox, Typography } from "antd/lib";

type FiltersType = {
  onChange: (key: string, values: string[]) => void;
};

const Filters: FC<FiltersType> = ({ onChange }) => {
  return (
    <div className={"flex flex-col"}>
      <section className={"pb-3 flex flex-col gap-2"}>
        <header>
          <Typography.Title level={5}>Categories</Typography.Title>
        </header>
        <Checkbox.Group
          options={productsConfig.categories}
          defaultValue={productsConfig.categories}
          onChange={(nextValues) => onChange("categories", nextValues)}
          className={"flex w-[80%] gap-2"}
        />
      </section>
    </div>
  );
};
export default Filters;
