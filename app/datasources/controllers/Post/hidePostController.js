const models = require('../../models');
const Response = require('../../utils/Response');

const hidePost = async (_, args, { user }) => {
  try {
    const findPost = await models.Post.findOne({ _id: args._id, owner: user.id });
    if (!findPost || findPost.status === 'Deleted' || findPost.status === 'Hidden') {
      return Response.GeneralResponse(false, 'Hidden post failed');
    }
    findPost.status = 'Hidden';
    await findPost.save();
    return Response.GeneralResponse(true, ` Hidden post ${args._id} succeed`);
  } catch (err) { return logger.error(err); }
};
module.exports = hidePost;
