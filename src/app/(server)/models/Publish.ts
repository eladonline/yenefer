import { Schema, model, models } from "mongoose";
import { ProductType } from "@/types/apis/publish/publish.products";

type PublishType = {
  publisher_id: string;
  products: ProductType[];
};

const schema = new Schema<PublishType>({
  products: [
    {
      publisher_id: String,
      lastPublished: { type: Date, required: true, default: Date.now },
      description: { type: String, required: true },
      name: { type: String, required: true },
      category: { type: String, required: true },
      price: { type: Number, required: true },
      images: { type: [{ type: String }], default: undefined },
    },
  ],
});

export default models.publish || model("publish", schema);
