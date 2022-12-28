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

  clapPost: controllers.clapPost,
  unclapPost: controllers.unclapPost,
  clapComment: controllers.clapComment,
  unclapComment: controllers.unclapComment,

  comment: controllers.comment,
  updateComment: controllers.updateComment,
  reply: controllers.reply,
  deleteComment: controllers.deleteComment,
};
module.exports = mutationResolver;
