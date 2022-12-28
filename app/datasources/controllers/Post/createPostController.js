const models = require('../../models');

const createPost = async (_, args, { user }) => {
  try {
    const newpost = await models.Post.create({
      title: args.title,
      content: args.content,
      owner: user.id,
      status: args.status,
    });
    return newpost;
  } catch (err) { return logger.error(err); }
};
module.exports = createPost;
