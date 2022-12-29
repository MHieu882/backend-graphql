function getuserbyAdmin(parent, args, context, info) {
  return context.dataSources.UserController.getuserbyAdmin(parent, args, context, info);
}

function getme(parent, args, context, info) {
  return context.dataSources.UserController.getme(parent, args, context, info);
}

function getUsers(parent, args, context, info) {
  return context.dataSources.UserController.getUsers(parent, args, context, info);
}

function getPost(parent, args, context, info) {
  return context.dataSources.PostController.getPost(parent, args, context, info);
}

function getPosts(parent, args, context, info) {
  return context.dataSources.PostController.getPosts(parent, args, context, info);
}

function getreplies(parent, args, context, info) {
  return context.dataSources.CommentController.getreplies(parent, args, context, info);
}
const queryResolver = {
  // admin
  user: getuserbyAdmin,
  // user
  me: getme,
  users: getUsers,

  // post
  post: getPost,
  posts: getPosts,

  //   // comment
  replies: getreplies,
};
module.exports = queryResolver;
