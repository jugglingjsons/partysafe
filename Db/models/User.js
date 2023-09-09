import mongoose from "mongoose";
import Drugkit from "./drugkit.js";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Make email unique
  Image: { type: String, required: true },
  userId: { type: String, required: true },
  cart: [{ type: Schema.Types.ObjectId, ref: 'Drugkit' }], // Use an array of ObjectIds to store references to drug-kits in the cart
  type: { type: String, required: true },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Drugkit' }], // Use an array of ObjectIds to store references to liked drug-kits
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
