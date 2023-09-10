// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);
