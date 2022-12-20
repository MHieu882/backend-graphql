const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  text: { type: String, require: true },
  author: String,
  subcomment: [{ type: mongoose.Types.ObjectId, ref: 'Subcomment' }],
  post: { type: mongoose.Types.ObjectId, ref: 'Post' },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
