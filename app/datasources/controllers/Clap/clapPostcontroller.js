const models = require('../../models');

const clapPost = async (_, args, { user }) => {
  try {
    const newclap = await models.Comment.create({
      post: args.postId,
      count: args.count,
      user: user.id,
      // postOwner:
    });
  } catch (error) {
    logger.error(error);
  }
};
module.exports = clapPost;
