// Post.jsx

import React, { useState } from "react";
import styles from "../../src/styles/dialogues.module.css";

const Post = ({ post, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleEditSave = () => {
    setIsEditing(false);
    onEdit(post._id, editedContent);
  };

  return (
    <div className={styles.post}>
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <div>{post.content}</div>
      )}
      <div className={styles.edit - delete -buttons}>
        {isEditing ? (
          <button className={styles.edit - button} onClick={handleEditSave}>
            Save
          </button>
        ) : (
          <button
            className={styles.edit - button}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
        <button
          className={styles.delete - button}
          onClick={() => onDelete(post._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
