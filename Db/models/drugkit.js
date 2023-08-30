import mongoose from "mongoose";

const { Schema } = mongoose;

const drugkitSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: {type: Number, required: true},
  image_url: {type: String, required: true},
});

const Drugkit = mongoose.models.Drugkit || mongoose.model("Drugkit", drugkitSchema);

export default Drugkit;