import React, { useState, useEffect } from 'react';

const Dialogue = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    const handlePostSubmit = async () => {
        if (newPost.trim() !== '') {
            try {
                const response = await fetch('/api/dialogue', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: newPost }),
                });

                if (response.ok) {
                    const newPostData = await response.json();
                    setPosts([...posts, newPostData]);
                    setNewPost('');
                } else {
                    console.error('Failed to create post:', response.statusText);
                }
            } catch (error) {
                console.error('Error creating post:', error);
            }
        }
    };

    const handleEditPost = async (id, newContent) => {
        try {
            const response = await fetch(`/api/dialogue?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newContent }),
            });

            if (response.ok) {
                const updatedPostData = await response.json();
                const updatedPosts = posts.map((post) =>
                    post._id === id ? updatedPostData : post
                );
                setPosts(updatedPosts);
            } else {
                console.error('Failed to update post:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleDeletePost = async (id) => {
        try {
            const response = await fetch(`/api/dialogue?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedPosts = posts.filter((post) => post._id !== id);
                setPosts(updatedPosts);
            } else {
                console.error('Failed to delete post:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/dialogue');

                if (response.ok) {
                    const postData = await response.json();
                    setPosts(postData);
                } else {
                    console.error('Failed to fetch posts:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="bg-white min-h-screen text-gray-800 p-4">
            <h1 className="text-center my-4">Anonymous Dialogue</h1>

            <div className="mb-4">
                <textarea
                    className="w-full border rounded p-2"
                    placeholder="Share your thoughts..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
                    onClick={handlePostSubmit}
                >
                    Post
                </button>
            </div>

            <div>
                {posts.map((post) => (
                    <div key={post._id} className="border rounded p-2 mb-2">
                        <div>{post.content}</div>
                        <div className="mt-2">
                            <button
                                className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                                onClick={() => handleEditPost(post._id, 'Updated content')}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white py-1 px-2 rounded"
                                onClick={() => handleDeletePost(post._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dialogue;
