const models = require('../../models');
const Response = require('../../utils/Response');

const deleteComment = async (_, args, { user }) => {
  try {
    const findcomment = await models.Comment.find({ _id: args._id, user: user.id });
    if (!findcomment[0]) {
      return Response.GeneralResponse(false, 'delete comment fail');
    }
    await findcomment[0].deleteOne();
    return Response.GeneralResponse(true, 'delete comment succeed');
  } catch (err) { return logger.error(err); }
};
module.exports = deleteComment;
