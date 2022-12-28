const User = require('./User');
const Post = require('./Post');
const Clap = require('./Clap');
const Comment = require('./Comment');

module.exports = {
  ...User,
  ...Post,
  ...Clap,
  ...Comment,
};
