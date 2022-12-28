const models = require('../../models');

const updatePost = async (_, args, { user }) => {
  try {
    const findpost = await models.Post.findById(args.input.id);
    if (!findpost) {
      return Response.GeneralResponse(false, ' post not found ');
    }
    const updatedata = {
      content: args.input.content,
      title: args.input.title,
      status: args.input.status,
    };
    const update = await models.Post.findOneAndUpdate({ _id: args.input.id, owner: user.id }, updatedata);
    return update;
  } catch (err) { return logger.error(err); }
};
module.exports = updatePost;
