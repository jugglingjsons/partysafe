import nextConnect from 'next-connect';
import dbConnect from '../../../../Db/DbConnect'; // Update the import path for dbConnect
import Post from '../../../../Db/models/Post'; // Update the import path for the Post model

const handler = nextConnect();

// Apply database middleware to the handler
handler.use(dbConnect);

// Endpoint to fetch all posts
handler.get(async (req, res) => {
    try {
        // Fetch all posts from the database
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Unable to fetch posts' });
    }
});

// Endpoint to create a new post
handler.post(async (req, res) => {
    const { content } = req.body;
    try {
        // Create a new post in the database
        const post = new Post({ content });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Unable to create post' });
    }
});

// Endpoint to update a post by ID
handler.put(async (req, res) => {
    const { id } = req.query;
    const { content } = req.body;

    try {
        // Find the post by ID and update its content
        const updatedPost = await Post.findByIdAndUpdate(id, { content }, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Unable to update post' });
    }
});

// Endpoint to delete a post by ID
handler.delete(async (req, res) => {
    const { id } = req.query;
    try {
        // Delete the post from the database by ID
        await Post.findByIdAndRemove(id);
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Unable to delete post' });
    }
});

export default handler;
