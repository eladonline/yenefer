import React, { FC, useState } from "react";
import { Button, Card, Spin, Tooltip, Typography } from "antd/lib";
import { ProductType } from "@/types/apis/user/data";
import {
  DeleteFilled,
  ClockCircleFilled,
  TeamOutlined,
  DollarCircleOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { EditOrRenewModal } from "@/app/(pages)/(home)/my-products/lib/Modals";
import { useProduct } from "@/app/(pages)/(home)/my-products/lib/useProduct";
import { PublishProductPayloadType } from "@/types/apis/publish/publish.products";

const ProductCard: FC<ProductType> = ({
  name,
  description,
  price,
  category,
  terms: { discount_each_buyer, quantity, min_price, end_date },
  images,
  last_published,
  last_updated,
  _id,
}) => {
  const isOutdated = dayjs(end_date).isBefore(dayjs());
  const isPublishedDisabled =
    (last_published && dayjs(last_published).isAfter(last_updated)) ||
    isOutdated;

  const payload: ProductType = {
    _id,
    name,
    category,
    description,
    price,
    terms: { discount_each_buyer, quantity, min_price, end_date },
    images,
  };

  return (
    <Card
      extra={
        <div className={"flex gap-3"}>
          <EditOrRenewModal payload={payload}>
            {isOutdated ? "Renew" : "Edit"}
          </EditOrRenewModal>
          <DeleteProduct id={_id as string} />
        </div>
      }
      actions={[
        <Tooltip key={"discount"} title={`Discount per Buyer`}>
          <DollarCircleOutlined style={{ fontSize: "14px" }} />{" "}
          <Typography.Text>{discount_each_buyer.value}</Typography.Text>
        </Tooltip>,

        <Tooltip key={"MaxBuyers"} title={`Quantity`}>
          <TeamOutlined style={{ fontSize: "14px" }} />{" "}
          <Typography.Text>{quantity}</Typography.Text>
        </Tooltip>,

        <Tooltip key={"MinPrice"} title={`Min Price`}>
          <VerticalAlignBottomOutlined style={{ fontSize: "14px" }} />{" "}
          <Typography.Text>{min_price}</Typography.Text>
        </Tooltip>,
        <Tooltip
          key={"EndDate"}
          title={`End Date: ${dayjs(end_date).format("DD/MM/YY HH:mm")}`}
        >
          <ClockCircleFilled style={{ fontSize: "14px" }} />
        </Tooltip>,
      ]}
      title={
        <Typography.Title
          level={4}
          className={`ovrd [&.ovrd]:max-w-[90%] ${isOutdated ? "[&.ovrd]:text-red-700" : "[&.ovrd]:text-blue-900"}`}
          ellipsis={{ tooltip: { title: name } }}
        >
          {name}
        </Typography.Title>
      }
      className={`ovrd flex flex-col  min-w-[250px] ${isOutdated ? "[&.ovrd]:bg-zinc-200  [&.ovrd>ul]:bg-zinc-200" : ""} `}
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
      <PublishProduct
        disabled={isPublishedDisabled as boolean}
        payload={payload as PublishProductPayloadType}
        id={_id as string}
      />
    </Card>
  );
};

const DeleteProduct = ({ id }: { id: string }) => {
  const { onDeleteProduct } = useProduct();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDeleteProduct(id);
    setIsDeleting(false);
  };

  if (isDeleting) return <Spin size={"small"} />;
  return (
    <DeleteFilled
      onClick={handleDelete}
      className={"cursor-pointer hover:text-red-500"}
    />
  );
};

type PublishProductType = {
  id: string;
  payload: PublishProductPayloadType;
  disabled: boolean;
};

const PublishProduct = ({ id, payload, disabled }: PublishProductType) => {
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const { onPublishProduct } = useProduct();

  const handlePublish = async () => {
    setIsPublishing(true);
    await onPublishProduct(id, payload);
    setIsPublishing(false);
  };

  return (
    <Button
      disabled={disabled}
      className={"ovrrd [&.ovrrd]:rounded-2xl mt-4 w-[100%]"}
      onClick={handlePublish}
      loading={isPublishing}
    >
      Publish
    </Button>
  );
};

export default ProductCard;
