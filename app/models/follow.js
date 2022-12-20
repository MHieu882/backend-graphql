const mongoose = require('mongoose');

const { Schema } = mongoose;

const followSchema = new Schema({
  author: String,
  follower: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
});

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;
