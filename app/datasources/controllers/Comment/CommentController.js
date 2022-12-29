const models = require('../../models');
const { throwError } = require('../../../utils');

async function comment(parent, args, context, info) {
  try {
    const { user } = context;
    const { Response } = context.dataSources;
    const findpost = await models.Post.findById(args.input.postId);
    if (!findpost) {
      return Response.GeneralResponse(false, 'Post not found');
    }
    const newcomment = await models.Comment.create({
      post: args.input.postId,
      content: args.input.content,
      title: args.input.title,
      user: user.id,
    });
    return newcomment;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}
async function deleteComment(parent, args, context, info) {
  try {
    const { user } = context;
    const { Response } = context.dataSources;
    const findcomment = await models.Comment.find({ _id: args._id, user: user.id });
    if (!findcomment[0]) {
      return Response.GeneralResponse(false, 'delete comment fail');
    }
    await findcomment[0].deleteOne();
    return Response.GeneralResponse(true, 'delete comment succeed');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}
async function updateComment(parent, args, context, info) {
  try {
    const { user } = context;
    const { Response } = context.dataSources;
    const findcomment = await models.Comment.findById(args.input.commentId);
    if (!findcomment) {
      return Response.GeneralResponse(false, 'Comment not found ');
    }
    const updatedata = {
      content: args.input.content,
      title: args.input.title,
    };
    const update = await models.Comment.findOneAndUpdate({ _id: args.input.commentId, user: user.id }, updatedata);
    return update;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}
async function reply(parent, args, context, info) {
  try {
    const { user } = context;
    const { commentId } = args.input;
    const findcomment = await models.Comment.findById(commentId);
    if (!findcomment) {
      throwError('NOT FOUND', 'Comment not found', 404);
    }
    const newreply = await models.Comment.create({
      parent: commentId,
      content: args.input.content,
      post: findcomment.post,
      title: args.input.title,
      user: user.id,
    });
    return newreply;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}
module.exports = { comment, deleteComment, updateComment, reply };
