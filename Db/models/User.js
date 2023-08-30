import mongoose from "mongoose";

const { Schema } = mongoose;

const drugkitSchema = new Schema({
  nickname: { type: String, required: true },
  email: { type: String, required: true },
  favorites: [{type: mongoose.Schema.Types.ObjecticId, ref: 'Drugkit'}],
  admin: {type: Boolean, default: false}
});

const Drugkit = mongoose.models.Drugkit || mongoose.model("Drugkit", drugkitSchema);

export default Drugkit;