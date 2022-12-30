const { createPost, deletePost, hidePost, updatePost } = require('./postController');
const { getPosts, getPost, getowner, getclapCount } = require('./query');

module.exports = {
  createPost,
  updatePost,
  deletePost,
  hidePost,
  // query
  getPost,
  getPosts,
  // dataloader
  getowner,
  getclapCount,
};
