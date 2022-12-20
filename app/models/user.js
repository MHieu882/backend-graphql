const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String },
  name: { type: String, required: true },
  posts: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
  comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
  isbanned: { type: Boolean, default: false },
  role: { type: String, default: 'user' },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
