const { createPost, deletePost, hidePost, updatePost } = require('./postController');
const { getPosts, getPost } = require('./query');

module.exports = {
  createPost,
  updatePost,
  deletePost,
  hidePost,
  // query
  getPost,
  getPosts,
};
