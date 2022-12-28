const models = require('../../models');
const Response = require('../../utils/Response');

const reply = async (_, args, { user }) => {
  try {
    const findcomment = await models.Comment.findById(args.input.commentId);
    if (!findcomment) {
      return Response.GeneralResponse(false, 'Comment not found');
    }
    const newreply = await models.Comment.create({
      parent: args.input.commentId,
      content: args.input.content,
      title: args.input.title,
      user: user.id,
    });
    return newreply;
  } catch (err) { return logger.error(err); }
};
module.exports = reply;
