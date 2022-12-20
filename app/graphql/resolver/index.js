const User = require('./user');
const Find = require('./find');

const resolvers = {
  Mutation: {
    // User
    createUser: User.createUser,
    login: User.login,
    createPost: User.createPost,
    createComment: User.createComment,
    follow: User.follow,
  },
  Query: {
    Alluser: Find.Alluser,
    AllPosts: Find.AllPosts,
  },
  User: {
    posts: Find.User.posts,
  },
  Post: {
    author: Find.Post.author,
  },
};
module.exports = resolvers;
