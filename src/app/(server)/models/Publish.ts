import { Schema, model, models } from "mongoose";
import { PublishProductType } from "@/types/apis/publish/publish.products";
const hoursEnum = Array.from(Array(25).keys());

export type PublishType = {
  created: Date;
  date: `${number}/${number}/${number}`;
  products: PublishProductType[];
};

const schema = new Schema<PublishType>({
  created: { type: Date, default: Date.now },
  date: { type: String, required: true },
  products: {
    type: [
      {
        product_source_id: { type: String, required: true },
        last_published: { type: Date, required: true },
        description: { type: String, required: true },
        name: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        images: { type: [{ type: String }], default: undefined },
      },
    ],
  },
});

export default models.publish || model("publish", schema, "publish");
