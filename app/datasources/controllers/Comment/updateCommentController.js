const models = require('../../models');
const Response = require('../../utils/Response');

const updateComment = async (_, args, { user }) => {
  try {
    const findcomment = await models.Comment.findById(args.input.commentId);
    if (!findcomment) {
      return Response.GeneralResponse(false, 'Comment not found ');
    }
    const updatedata = {
      content: args.input.content,
      title: args.input.title,
    };
    const update = await models.Comment.findOneAndUpdate({ _id: args.input.commentId, user: user.id }, updatedata);
    return update;
  } catch (err) { return logger.error(err); }
};
module.exports = updateComment;
