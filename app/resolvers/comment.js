function getCommentUserLoader(parent, args, context, info) {
  return context.dataSources.CommentController.getUSerComment(parent, args, context, info);
}
function getCommentPostLoader(parent, args, context, info) {
  return context.dataSources.CommentController.getPostComment(parent, args, context, info);
}
module.exports = {
  User: getCommentUserLoader,
  post: getCommentPostLoader,
};
