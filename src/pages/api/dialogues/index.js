
import dbConnect from "../../../../Db/DbConnect"; // Update the import path for dbConnect
import Post, { PostValidator } from "../../../../Db/models/Post"; // Update the import path for the Post model

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      // Fetch all posts from the database
      const posts = await Post.find().sort({ createdAt: -1 });
      return response.status(200).json( posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error(error).message;
    }
  }

  if (request.method === "POST") {

    const { content } = request.body;
    try {
      // Create a new post in the database
      const post = new Post({ content });
      if (!PostValidator(post)) {
        throw new Error("Invalid post")
      }
      await post.save();
      return response.json({ post });

    } catch (error) {
      console.error("Error creating post:", error);
      throw new Error(error).message;    }
  }
  if (request.method === "PUT") {
    const { id } = request.query;
    const { content } = request.body;

    try {
      // Find the post by ID and update its content
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { content },
        { new: true }
      );
      return response.json({ updatedPost });
    } catch (error) {
      console.error("Error updating post:", error);
      throw new Error(error).message;    }
  }
  if (request.method === "DELETE") {
    const { id } = request.query;
    try {
      // Delete the post from the database by ID
      await Post.findByIdAndRemove(id);
      return response.status(204);
    } catch (error) {
      console.error("Error deleting post:", error);
      throw new Error(error).message;    }
  }

}
