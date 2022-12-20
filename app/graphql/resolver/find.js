const models = require('../../models');
const logger = require('../../utils/logger');

const Find = {
  Alluser: async () => {
    try {
      const users = await models.User.find();
      return users;
    } catch (err) {
      return logger.error(err);
    }
  },
  AllPosts: async () => {
    try {
      const posts = await models.Post.find();
      return posts;
    } catch (err) {
      return logger.error(err);
    }
  },
  User: {
    posts: async ({ email }) => {
      const posts = await models.Post.find({ author: email });
      return posts;
    },
  },
  Post: {
    author: async ({ author }) => {
      const user = await models.User.find({ email: author });
      return user[0];
    },
  },

};
module.exports = Find;
