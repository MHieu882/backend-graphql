const mongoose = require('mongoose');

const { Schema } = mongoose;

const SubCommentSchema = new Schema({
  text: { type: String, require: true },
  author: String,
  comment: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
});

const SubComment = mongoose.model('SubComment', SubCommentSchema);

module.exports = SubComment;
