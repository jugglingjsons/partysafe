import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Make email unique
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Drugkit' }], // Use an array of ObjectIds to store references to liked drug-kits
  admin: { type: Boolean, default: false }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
