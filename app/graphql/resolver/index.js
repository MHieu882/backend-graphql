const User = require('./user');
const Find = require('./find');
const Post = require('./post');
const Comment = require('./comment');

const resolvers = {
  Mutation: {
    // User
    createUser: User.createUser,
    login: User.login,
    createPost: Post.createPost,
    createComment: Comment.createComment,
    follow: User.follow,
    changePassword: User.changePassword,
  },
  Query: {
    Alluser: Find.Alluser,
    AllPosts: Find.AllPosts,
    logout: User.logout,
  },
  User: {
    posts: Find.User.posts,
  },
  Post: {
    author: Find.Post.author,
  },
};
module.exports = resolvers;
