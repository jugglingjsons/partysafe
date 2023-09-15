import nextConnect from "next-connect";
import dbConnect from "../../../../Db/DbConnect"; // Update the import path for dbConnect
import Post from "../../../../Db/models/Post"; // Update the import path for the Post model


import { createEdgeRouter } from "next-connect";
import { NextResponse } from "next/server";

const handler = createEdgeRouter();

handler.use(dbConnect);


router.get(async (req) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.error({ error: "Unable to fetch posts" })
  }
});

router.post(async (req) => {
  const { content } = req.body;
  try {
    // Create a new post in the database
    const post = new Post({ content });
    await post.save();
    return NextResponse.json({ post });

  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.error({ error: "Unable to create post" });
  }
});


// Endpoint to update a post by ID
handler.put(async (req, res) => {
  const { id } = req.query;
  const { content } = req.body;

  try {
    // Find the post by ID and update its content
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );
    return NextResponse.json({ updatedPost });

  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.error({ error: "Unable to update post" });

  }
});

// Endpoint to delete a post by ID
handler.delete(async (req, res) => {
  const { id } = req.query;
  try {
    // Delete the post from the database by ID
    await Post.findByIdAndRemove(id);

    return NextResponse.status(204);

  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.error({ error: "Unable to delete post" });
  }
});


export async function GET() {
  return router.run(request, ctx);
}

export async function POST() {
  return router.run(request, ctx);
}

export async function PUT() {
  return router.run(request, ctx);
}
export async function DELETE() {
  return router.run(request, ctx);
}