const models = require('../../models');

async function createPost(parent, args, context, info) {
  try {
    const { user } = context;
    const newpost = await models.Post.create({
      title: args.title,
      content: args.content,
      owner: user.id,
      status: args.status,
    });
    return newpost;
  } catch (err) { return logger.error(err); }
}
async function deletePost(parent, args, context, info) {
  try {
    const { Response } = context.dataSources;
    const { user } = context;
    const findPost = await models.Post.findOne({ _id: args._id, owner: user.id });
    if (!findPost || findPost.status === 'Deleted') {
      return Response.GeneralResponse(false, 'Delete post failed');
    }
    findPost.status = 'Deleted';
    await findPost.save();
    return Response.GeneralResponse(true, ` delete post ${args._id} succeed`);
  } catch (err) { return logger.error(err); }
}
async function hidePost(parent, args, context, info) {
  try {
    const { Response } = context.dataSources;
    const { user } = context;
    const findPost = await models.Post.findOne({ _id: args._id, owner: user.id });
    if (!findPost || findPost.status === 'Deleted' || findPost.status === 'Hidden') {
      return Response.GeneralResponse(false, 'Hidden post failed');
    }
    findPost.status = 'Hidden';
    await findPost.save();
    return Response.GeneralResponse(true, ` Hidden post ${args._id} succeed`);
  } catch (err) { return logger.error(err); }
}
async function updatePost(parent, args, context, info) {
  try {
    const { Response } = context.dataSources;
    const { user } = context;
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
}

module.exports = { createPost, deletePost, hidePost, updatePost };
