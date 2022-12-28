const models = require('../../models');
const Response = require('../../utils/Response');

const deletePost = async (_, args, { user }) => {
  try {
    const findPost = await models.Post.findOne({ _id: args._id, owner: user.id });
    if (!findPost || findPost.status === 'Deleted') {
      return Response.GeneralResponse(false, 'Delete post failed');
    }
    findPost.status = 'Deleted';
    await findPost.save();
    return Response.GeneralResponse(true, ` delete post ${args._id} succeed`);
  } catch (err) { return logger.error(err); }
};
module.exports = deletePost;
