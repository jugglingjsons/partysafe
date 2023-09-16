// models/Post.js
import { Schema, models, model } from "mongoose";

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    tag: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export default models.Post || model("Post", postSchema);

export function PostValidator(post) {
  if (!post.content) {
  return false
  }
  if (!post.tag) {
    return false
  }
  return true
}