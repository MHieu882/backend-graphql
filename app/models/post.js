const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, require: true },
  body: { type: String, require: true },
  comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
  createAt: { type: Date },
  author: { type: String, require: true },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
