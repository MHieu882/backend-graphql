const models = require('../../models');
const Response = require('../../utils/Response');

const comment = async (_, args, { user }) => {
  try {
    const findpost = await models.Post.findById(args.input.postId);
    if (!findpost) {
      return Response.GeneralResponse(false, 'Post not found');
    }
    const newcomment = await models.Comment.create({
      post: args.input.postId,
      content: args.input.content,
      title: args.input.title,
      user: user.id,
    });
    return newcomment;
  } catch (err) { return logger.error(err); }
};
module.exports = comment;
