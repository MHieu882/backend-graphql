const mongoose = require('mongoose');

const { Schema } = mongoose;

const Clapschema = new Schema({
  postID: [{ type: Schema.Types.ObjectId, ref: 'posts' }],
  author: String,
  count: Number,
});

const Clap = mongoose.model('Clap', Clapschema);

module.exports = Clap;
