import { Schema, model, models } from "mongoose";
import { PublishProductType } from "@/types/apis/publish/publish.products";

type PublishType = {
  products: PublishProductType[];
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
