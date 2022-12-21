const { GraphQLError } = require('graphql');
const models = require('../../models');
const logger = require('../../utils/logger');

const Post = {
  createPost: async (_, args, { req }) => {
    try {
      const newpost = await models.Post.create({
        title: args.input.title,
        body: args.input.body,
        author: req.session.user.email,
      });
      const user = await models.User.findById(req.session.user._id);
      user.posts.push(newpost._id);
      await user.save();
      await new GraphQLError('Successfully', { extensions: {
        code: 'CREATED',
        http: { status: 201 },
      } });
      return newpost;
    } catch (err) {
      return logger.error(err);
    }
  },
};
module.exports = Post;
