const controllers = require('../datasources/controllers');

const mutationResolver = {
  register: controllers.register,
  login: controllers.login,
  disableUser: controllers.disableUser,
  follow: controllers.follow,
  unfollow: controllers.unfollow,

  createPost: controllers.createPost,
  updatePost: controllers.updatePost,
  deletePost: controllers.deletePost,
  hidePost: controllers.hidePost,
};
module.exports = mutationResolver;
