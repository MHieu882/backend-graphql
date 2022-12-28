const models = require('../../models');
const Response = require('../../utils/Response');

const clapPost = async (_, args, { user }) => {
  try {
    const checkclap = await models.Clap.find({ post: args.postId, user: user.id });
    if (!checkclap[0]) {
      return Response.GeneralResponse(false, 'unclap fail');
    }
    await checkclap[0].deleteOne();
    return Response.GeneralResponse(true, 'unclap succeed');
  } catch (err) { return logger.error(err); }
};
module.exports = clapPost;
