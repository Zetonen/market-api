import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, preUpdate } from "./hooks.js";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Furniture",
        "Jobs",
        "Hobby",
        "Clothing",
        "Car",
        "Food",
        "Electronics",
        "House",
      ],
    },
    price: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "user",
    },
    image: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

postSchema.post("save", handleSaveError);

postSchema.pre("findOneAndUpdate", preUpdate);

postSchema.post("findOneAndUpdate", handleSaveError);

export const postAddSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string()
    .valid(
      "Furniture",
      "Jobs",
      "Hobby",
      "Clothing",
      "Car",
      "Food",
      "Electronics",
      "House"
    )
    .required(),
  price: Joi.string().required(),
  address: Joi.string().required(),
});

const Post = model("post", postSchema);

export default Post;
