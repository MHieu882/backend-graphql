const models = require('../../models');

const updatePost = async (_, args, { user }) => {
  try {
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
