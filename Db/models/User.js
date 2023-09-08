// import mongoose from "mongoose";
// import Drugkit from "./drugkit.js";

// const { Schema } = mongoose;

// const userSchema = new Schema({
//   name: { type: String, required: true },
//   nickname: { type: String, required: true },
//   email: { type: String, required: true, unique: true }, // Make email unique
//   Image: { type: String, required: true },
//   sessionToken: { type: String, required: true },
//   userId: { type: String, required: true },
//   id_token: { type: String, required: true },
//   cart: [{ type: Schema.Types.ObjectId, ref: 'Drugkit' }], // Use an array of ObjectIds to store references to drug-kits in the cart
//   provider: { type: String, required: true },
//   type: { type: String, required: true },
//   providerAccountId: { type: String, required: true },
//   access_token: { type: String, required: true },
//   token_type: { type: String, required: true },
//   favorites: [{ type: Schema.Types.ObjectId, ref: 'Drugkit' }], // Use an array of ObjectIds to store references to liked drug-kits
//   admin: { type: Boolean, default: false }
// });

// const User = mongoose.models.User || mongoose.model("User", userSchema);

// export default User;
