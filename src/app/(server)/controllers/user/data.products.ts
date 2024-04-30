import { NextRequest, NextResponse } from "next/server";
import errorHandler from "@/app/(server)/handlers/errorHandler";
import { ProductType } from "@/types/apis/user/data";
import cloudinaryService from "@/app/(server)/services/cloudinary";
import { clientTokenProps } from "@/app/(server)/services/Jwt";
import tokenHandler from "@/app/(server)/handlers/tokenHandler";
import { JwtPayload } from "jsonwebtoken";
import User, { UserType } from "@/app/(server)/models/User";
import _set from "lodash/set";
import type { UploadFile } from "antd/lib";
import Publish from "@/app/(server)/models/Publish";
import _get from "lodash/get";
import { PublishProductType } from "@/types/apis/publish/publish.products";

type RequestPayloadType = NextRequest & {
  tokenPayload?: JwtPayload & clientTokenProps;
  body: {
    name: string;
    category: string;
    description: string;
    price: number;
    terms: {
      min_price: number;
      discount_each_buyer: { value: number; unit: string };
      end_date: any;
      quantity: number;
    };
    images: UploadFile[];
  };
};

export const createProductController = async (request: RequestPayloadType) => {
  const id = request.headers.get("id");
  const usr = request?.tokenPayload?.usr;

  const { name, category, description, price, terms, images } =
    await request.json();
  const product: ProductType = {
    name,
    category,
    description,
    price,
    terms,
  };
  const user: UserType | null = await User.findById(id);

  if (!user) throw new Error("");

  if (images) {
    const dbImages = [];

    for (let image of images) {
      try {
        const uploadData = await cloudinaryService.uploader.upload(
          image.thumbUrl,
          {
            folder: `${usr}/${name}`,
            unique_filename: true,
          },
        );
        const { signature, public_id, secure_url, url, folder } = uploadData;
        dbImages.push({
          meta: { signature, public_id, folder },
          src: { url, secure_url },
        });
      } catch (err) {
        console.trace(err);
      }
    }

    if (dbImages.length) product.images = dbImages;
  }

  if (!user?.data?.products) _set(user, "data.products", [product]);
  else user.data.products.push(product);

  await User.findByIdAndUpdate(id, user);

  return NextResponse.json(
    { message: "Product created successfully" },
    { status: 200 },
  );
};

export const patchProductController = async (
  request: RequestPayloadType,
  { params }: { params: { productId: string } },
) => {
  const id = request.headers.get("id");
  const usr = request?.tokenPayload?.usr;
  const productQuery = {
    _id: id,
    "data.products._id": params.productId,
  };

  const { name, category, description, price, terms, images, imagesToRemove } =
    await request.json();

  const nextProductSet: { [key: string]: any } = {
    "data.products.$.name": name,
    "data.products.$.category": category,
    "data.products.$.description": description,
    "data.products.$.price": price,
    "data.products.$.terms": terms,
    "data.products.$.last_updated": new Date(),
  };

  const user = await User.findOne(productQuery).select("data.products");
  let userImages: ProductType["images"] | null =
    user?.data?.products?.[0]?.images;

  if (imagesToRemove) {
    userImages = userImages?.filter(
      ({ meta: { public_id } }: { meta: { public_id: string } }) =>
        !imagesToRemove.includes(public_id),
    );
    nextProductSet["data.products.$.images"] = userImages;

    for (let imagePublicId of imagesToRemove) {
      await cloudinaryService.uploader.destroy(imagePublicId);
    }
  }

  if (images?.length) {
    const nextImages = [];

    for (let image of images) {
      try {
        const uploadData = await cloudinaryService.uploader.upload(
          image.thumbUrl,
          {
            folder: `${usr}/${name}`,
            unique_filename: true,
          },
        );
        const { signature, public_id, secure_url, url, folder } = uploadData;
        nextImages.push({
          meta: { signature, public_id, folder },
          src: { url, secure_url },
        });
      } catch (err) {
        console.trace(err);
      }

      if (userImages?.length) nextImages.push([...nextImages, ...userImages]);

      if (nextImages.length)
        nextProductSet["data.products.$.images"] = nextImages;
    }
  }

  await User.findOneAndUpdate(productQuery, {
    $set: nextProductSet,
  });
  return NextResponse.json(
    { message: "Product updated successfully" },
    { status: 200 },
  );
};

export const deleteProductController = async (
  request: RequestPayloadType,
  { params }: { params: { productId: string } },
) => {
  const id = request.headers.get("id");
  const usr = request?.tokenPayload?.usr;

  const user = (await User.findOneAndUpdate(
    { _id: id },
    {
      $pull: { "data.products": { _id: params.productId } },
    },
    { lean: true },
  )) as UserType | null;

  if (user?.data?.products?.[0]?.images) {
    try {
      const name = user?.data?.products?.[0]?.name;
      await cloudinaryService.api.delete_resources_by_prefix(`${usr}/${name}`);
      await cloudinaryService.api.delete_folder(`${usr}/${name}`);
    } catch (err: any) {
      console.log(`user_id :${id}`, err?.error);
    }
  }

  return NextResponse.json(
    { message: "Product Deleted successfully" },
    { status: 200 },
  );
};

export const getProductController = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = request.headers.get("id");
  const filters: { [key: string]: any } = { _id: id };
  const projection: { [key: string]: any } = { data: 1 };
  const categoriesFilter = searchParams.get("categories")?.split(",");

  if (categoriesFilter) {
    _set(projection, "data.products", {
      $filter: {
        input: "$data.products",
        as: "product",
        cond: { $in: ["$$product.category", categoriesFilter] },
      },
    });
  }

  const userPayload = await User.findOne(filters, projection);
  return NextResponse.json(userPayload?.data?.products || [], { status: 200 });
};

// PUBLISH at api/products/publish
export const publishProductController = async (
  request: NextRequest,
  { params }: { params: { productId: string } },
) => {
  const id = request.headers.get("id");
  const productQuery: { [key: string]: any } = {
    _id: id,
    "data.products._id": params.productId,
  };

  const user = await User.findOneAndUpdate(
    productQuery,
    {
      $set: { "data.products.$.last_published": new Date() },
    },
    { new: true },
  ).select("data.products.0");

  const product: ProductType = _get(user, "data.products.0");
  // console.log(JSON.stringify(user, null, 2));
  const nextPublishPayload: PublishProductType = {
    product_source_id: params.productId,
    last_published: product.last_published as Date,
    description: product.description,
    name: product.name,
    category: product.category,
    price: product.price,
    terms: product.terms,
  };

  if (product?.images) {
    nextPublishPayload.images = product.images.map(({ src: { url } }) => url);
  }

  await Publish.findOneAndUpdate(
    {
      "publishers.publisher_id": id,
      "products.product_source_id": params.productId,
    },
    {
      $set: {
        "publishers.$.products.$": nextPublishPayload,
      },
    },
    { upsert: true },
  );

  return NextResponse.json(
    { message: "Publish successfully" },
    { status: 200 },
  );
};

export const createProduct = async (...args: any) =>
  errorHandler(
    ...(tokenHandler(createProductController, args) as [Function, []]),
  );

export const patchProduct = async (...args: any) =>
  errorHandler(
    ...(tokenHandler(patchProductController, args) as [Function, []]),
  );

export const deleteProduct = async (...args: any) =>
  errorHandler(
    ...(tokenHandler(deleteProductController, args) as [Function, []]),
  );

export const getProduct = async (...args: any) =>
  errorHandler(getProductController, args);

export const publishProduct = async (...args: any) =>
  errorHandler(publishProductController, args);
