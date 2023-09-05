import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  nickname: { type: String, required: true },
  email: { type: String, required: true },
  // favorites: {type: Array, default: []},
  admin: {type: Boolean, default: false}
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;