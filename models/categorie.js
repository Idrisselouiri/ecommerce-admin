import mongoose, { Schema, model, models } from "mongoose";

const categorieSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  parent: { type: mongoose.Types.ObjectId, ref: "Categorie" },
});

const Categorie = models?.Categorie || model("Categorie", categorieSchema);

export default Categorie;
