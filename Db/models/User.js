import mongoose from "mongoose";
import Drugkit from "./drugkit.js";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true }, // Corrected field name
  userId: { type: String, required: true }, // Adjust the data type if needed
  cart: [{ type: Schema.Types.ObjectId, ref: "Drugkit" }],
  favorites: [{ type: Schema.Types.ObjectId, ref: "Drugkit" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
