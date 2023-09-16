// Dialogues.jsx

import React, { useState, useEffect } from "react";
import styles from "../../src/styles/Dialogues.module.css";
import Post from "../components/Post"; // Import the Post component

const tags = [
  "BadTrip",
  "Overdose",
  "MixedUsed",
  "LSD",
  "Addiction",
  "DrugTestingKit",
  "Counseling",
  "Drugs",
  "Effect",
  "Dosage",
  "SideEffect",
  "SexUse",
  "Risk",
  "Recommendation",
];

const Dialogues = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagClick = (tag) => {
    // Toggle tag selection
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePostSubmit = async () => {
    if (newPost.trim() !== "") {
      try {
        const response = await fetch("/api/dialogues", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: newPost, tags: selectedTags }),
        });

        if (response.ok) {
          const newPostData = await response.json();
          console.log(newPostData)
          setPosts([...posts, newPostData]);
          setNewPost("");
          setSelectedTags([]);
        } else {
          console.error("Failed to create post:", response.statusText);
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  // Placeholder data for posts, replace with actual data from your API
  const placeholderPosts = [
    {
      _id: "1",
      content: "This is the first post content.",
      tags: ["BadTrip"],
    },
    {
      _id: "2",
      content: "This is the second post content.",
      tags: ["Overdose"],
    },
    {
      _id: "3",
      content: "This is the third post content.",
      tags: ["MixedUsed"],
    },
    {
      _id: "4",
      content: "This is the fourth post content.",
      tags: ["LSD"],
    },
    {
      _id: "5",
      content: "This is the fifth post content.",
      tags: ["Addiction"],
    },
    {
      _id: "6",
      content: "This is the sixth post content.",
      tags: ["DrugTestingKit"],
    },
    {
      _id: "7",
      content: "This is the seventh post content.",
      tags: ["Counseling"],
    },
    {
      _id: "8",
      content: "This is the eighth post content.",
      tags: ["Drugs"],
    },
    {
      _id: "9",
      content: "This is the ninth post content.",
      tags: ["Effect"],
    },
    {
      _id: "10",
      content: "This is the ninth post content.",
      tags: ["Dosage"],
    },
    {
      _id: "11",
      content: "This is the ninth post content.",
      tags: ["SideEffect"],
    },
    {
      _id: "12",
      content: "This is the ninth post content.",
      tags: ["SexUse"],
    },
    {
      _id: "13",
      content: "This is the ninth post content.",
      tags: ["Risk"],
    },
    {
      _id: "14",
      content: "This is the ninth post content.",
      tags: ["Recommendation"],
    },
  ];

  useEffect(() => {
    // Simulate loading posts from an API based on selected tags
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `/api/dialogues?tags=${selectedTags.join(",")}`
        );
        if (response.ok) {
          const postData = await response.json();
          console.log(postData)

          setPosts(postData);
        } else {
          console.error("Failed to fetch posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [selectedTags]);

  const handleEditPost = async (id, newContent) => {
    try {
      const response = await fetch(`/api/dialogues?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
        console.error("Failed to update post:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await fetch(`/api/dialogues?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedPosts = posts.filter((post) => post._id !== id);
        setPosts(updatedPosts);
      } else {
        console.error("Failed to delete post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className={styles.dialoguesContainer}>
      <h1 className="text-center my-4">Anonymous Dialogue</h1>
      <div className={styles.tagButtons}>
        {/* Render tag buttons and handle tag selection */}
        {tags.map((tag, index) => (
          <button
            key={index}
            className={`bg-gray-300 text-gray-700 py-1 px-2 rounded mr-2 ${
              selectedTags.includes(tag) ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handleTagClick(tag)} // Add this click handler
          >
            {tag}
          </button>
        ))}
      </div>
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
          <Post
            key={post._id}
            post={post}
            onEdit={(newContent) => handleEditPost(post._id, newContent)}
            onDelete={() => handleDeletePost(post._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dialogues;
