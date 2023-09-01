// pages/dialogue.js

import React, { useState } from 'react';

const Dialogue = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    const handlePostSubmit = () => {
        if (newPost.trim() !== '') {
            setPosts([...posts, newPost]);
            setNewPost('');
        }
    };

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
                {posts.map((post, index) => (
                    <div key={index} className="border rounded p-2 mb-2">
                        {post}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dialogue;
