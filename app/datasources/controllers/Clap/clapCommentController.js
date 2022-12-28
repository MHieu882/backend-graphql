const models = require('../../models');
const Response = require('../../utils/Response');

const clapComment = async (_, args, { user }) => {
  try {
    const findcomment = await models.Comment.findById(args.commentId);
    const checkclap = await models.Clap.find({ comment: args.commentId, user: user.id });
    if (!findcomment) {
      return Response.GeneralResponse(false, 'clap fail');
    }
    if (!checkclap[0]) {
      await models.Clap.create({
        count: args.count,
        user: user.id,
        comment: findcomment.commentId,
      });
      return Response.GeneralResponse(true, 'clap succeed');
    }
    await checkclap[0].updateOne({ $inc: { count: args.count } });
    return Response.GeneralResponse(true, 'clap update');
  } catch (err) { return logger.error(err); }
};
module.exports = clapComment;
