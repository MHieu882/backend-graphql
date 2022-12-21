const { GraphQLError } = require('graphql');
const models = require('../../models');
const logger = require('../../utils/logger');

const Comment = {
  createComment: async (_, args, { req }) => {
    try {
      const newComment = await models.Comment.create({
        text: args.text,
        postID: args.postID,
        author: req.session.user.email,
      });
      const user = await models.User.findById(req.session.user._id);
      user.comments.push(newComment._id);
      const post = await models.Post.findById(args.postID);
      post.comments.push(newComment._id);
      await user.save();
      await post.save();
      await new GraphQLError('Successfully', { extensions: {
        code: 'CREATED',
        http: { status: 201 },
      } });
      return newComment;
    } catch (err) {
      return logger.error(err);
    }
  },
  updateCommetnt: async (_, args, { req }) => {

  },
};
module.exports = Comment;
