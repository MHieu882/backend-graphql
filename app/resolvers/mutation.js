// user
function registerController(parent, args, context, info) {
  return context.dataSources.UserController.register(parent, args, context, info);
}
function loginController(parent, args, context, info) {
  return context.dataSources.UserController.login(parent, args, context, info);
}
function disableUserController(parent, args, context, info) {
  return context.dataSources.UserController.disableUser(parent, args, context, info);
}
function followController(parent, args, context, info) {
  return context.dataSources.UserController.follow(parent, args, context, info);
}
function unfollowController(parent, args, context, info) {
  return context.dataSources.UserController.unfollow(parent, args, context, info);
}
function logoutController(parent, args, context, info) {
  return context.dataSources.UserController.logout(parent, args, context, info);
}
// post
function createPostController(parent, args, context, info) {
  return context.dataSources.PostController.createPost(parent, args, context, info);
}

function updatePostController(parent, args, context, info) {
  return context.dataSources.PostController.updatePost(parent, args, context, info);
}
function deletePostController(parent, args, context, info) {
  return context.dataSources.PostController.deletePost(parent, args, context, info);
}
function hidePostController(parent, args, context, info) {
  return context.dataSources.PostController.hidePost(parent, args, context, info);
}
// clap
function clapPostController(parent, args, context, info) {
  return context.dataSources.ClapController.clapPost(parent, args, context, info);
}
function unclapPostController(parent, args, context, info) {
  return context.dataSources.ClapController.unclapPost(parent, args, context, info);
}
function clapCommentController(parent, args, context, info) {
  return context.dataSources.ClapController.clapComment(parent, args, context, info);
}
function unclapCommentController(parent, args, context, info) {
  return context.dataSources.ClapController.unclapComment(parent, args, context, info);
}
// comment
function commentController(parent, args, context, info) {
  return context.dataSources.CommentController.comment(parent, args, context, info);
}
function updateCommentController(parent, args, context, info) {
  return context.dataSources.CommentController.updateComment(parent, args, context, info);
}
function replyController(parent, args, context, info) {
  return context.dataSources.CommentController.reply(parent, args, context, info);
}
function deleteCommentController(parent, args, context, info) {
  return context.dataSources.CommentController.deleteComment(parent, args, context, info);
}
const mutationResolver = {
  register: registerController,
  login: loginController,
  logout: logoutController,
  disableUser: disableUserController,
  follow: followController,
  unfollow: unfollowController,

  createPost: createPostController,
  updatePost: updatePostController,
  deletePost: deletePostController,
  hidePost: hidePostController,

  clapPost: clapPostController,
  unclapPost: unclapPostController,
  clapComment: clapCommentController,
  unclapComment: unclapCommentController,

  comment: commentController,
  updateComment: updateCommentController,
  reply: replyController,
  deleteComment: deleteCommentController,
};
module.exports = mutationResolver;
