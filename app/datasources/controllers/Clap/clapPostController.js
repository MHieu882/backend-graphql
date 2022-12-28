const models = require('../../models');
const Response = require('../../utils/Response');

const clapPost = async (_, args, { user }) => {
  try {
    const findpostower = await models.Post.findById(args.postId);
    const checkclap = await models.Clap.find({ post: args.postId, user: user.id });
    if (!findpostower) {
      return Response.GeneralResponse(false, 'clap fail');
    }
    if (!checkclap[0]) {
      await models.Clap.create({
        post: args.postId,
        count: args.count,
        user: user.id,
        postOwner: findpostower.owner,
      });
      return Response.GeneralResponse(true, 'clap succeed');
    }
    await checkclap[0].updateOne({ $inc: { count: args.count } });
    return Response.GeneralResponse(true, 'clap update');
  } catch (err) { return logger.error(err); }
};
module.exports = clapPost;
