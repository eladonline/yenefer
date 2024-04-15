import React, { FC } from "react";
import { Card, Tooltip, Typography } from "antd/lib";
import { ProductType } from "@/types/apis/usersData";
import { DeleteFilled, ClockCircleFilled } from "@ant-design/icons";

type ItemCardType = ProductType & {
  onEdit: () => void;
  onDelete: (e: any) => void;
};

const ProductCard: FC<ItemCardType> = ({
  onEdit,
  onDelete,
  name,
  description,
  price,
  category,
  terms: { discount_each_buyer, max_buyers, min_price, end_date },
}) => {
  return (
    <Card
      extra={
        <div className={"flex gap-3"}>
          <div
            className={
              "font-bold text-blue-500 hover:text-blue-300 cursor-pointer"
            }
            onClick={onEdit}
          >
            Edit
          </div>
          <DeleteFilled
            onClick={onDelete}
            className={"cursor-pointer hover:text-red-500"}
          />
        </div>
      }
      title={
        <Typography.Text
          className={"ovrd [&.ovrd]:max-w-[90%]"}
          ellipsis={{ tooltip: { title: name } }}
        >
          {name}
        </Typography.Text>
      }
      className={"flex flex-col gap-3 min-w-[250px] "}
    >
      <div className={"flex gap-2"}>
        <Typography.Title className={"text-nowrap"} level={5}>
          Category:
        </Typography.Title>
        <Typography.Text>{category}</Typography.Text>
      </div>

      <div className={"flex gap-2"}>
        <Typography.Title className={"text-nowrap"} level={5}>
          Description:
        </Typography.Title>
        <Typography.Text ellipsis={{ tooltip: { title: description } }}>
          {description}
        </Typography.Text>
      </div>

      <div className={"flex gap-2"}>
        <Typography.Title className={"text-nowrap"} level={5}>
          Price:
        </Typography.Title>
        <Typography.Text>{price}</Typography.Text>
      </div>

      <div className={"flex gap-4"}>
        <span>{discount_each_buyer}</span>
        <span>{max_buyers}</span>
        <span>{min_price}</span>
        <span>
          <Tooltip title={end_date}>
            <ClockCircleFilled />
          </Tooltip>
        </span>
      </div>
    </Card>
  );
};
export default ProductCard;
