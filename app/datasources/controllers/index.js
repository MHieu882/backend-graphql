const User = require('./User');
const Post = require('./Post');
const Clap = require('./Clap');

module.exports = {
  ...User,
  ...Post,
  ...Clap,
};
