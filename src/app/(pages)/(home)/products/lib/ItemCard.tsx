import React, { FC } from "react";
import { Card, Typography } from "antd/lib";
import { ProductType } from "@/types/apis/usersData";
import { DeleteFilled } from "@ant-design/icons";

type ItemCardType = ProductType & {
  onEdit: () => void;
  onDelete: () => void;
};

const ItemCard: FC<ItemCardType> = ({
  onEdit,
  onDelete,
  name,
  description,
  price,
  category,
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
      title={name}
      className={"flex flex-col gap-3 w-[25%] min-w-[250px] "}
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
    </Card>
  );
};
export default ItemCard;
