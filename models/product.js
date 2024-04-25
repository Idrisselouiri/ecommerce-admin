import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
  },
  price: {
    type: Number,
    required: [true, "Price is required!"],
  },
  imageUrls: {
    type: Array,
    required: true,
  },
  properties: { type: Object },
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
