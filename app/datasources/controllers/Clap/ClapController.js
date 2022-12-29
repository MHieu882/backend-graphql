const models = require('../../models');
const { throwError } = require('../../../utils');

async function clapComment(parent, args, context, info) {
  try {
    const { user } = context;
    const { Response } = context.dataSources;
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
}
async function clapPost(parent, args, context, info) {
  try {
    const { user } = context;
    const { Response } = context.dataSources;
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
}
async function unclapComment(parent, args, context, info) {
  try {
    const { user } = context;
    const { Response } = context.dataSources;
    const checkclap = await models.Clap.find({ comment: args.commentID, user: user.id });
    if (!checkclap[0]) {
      return Response.GeneralResponse(false, 'unclap fail');
    }
    await checkclap[0].deleteOne();
    return Response.GeneralResponse(true, 'unclap succeed');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}
async function unclapPost(parent, args, context, info) {
  try {
    const { user } = context;
    const { Response } = context.dataSources;
    const checkclap = await models.Clap.find({ post: args.postId, user: user.id });
    if (!checkclap[0]) {
      return Response.GeneralResponse(false, 'unclap fail');
    }
    await checkclap[0].deleteOne();
    return Response.GeneralResponse(true, 'unclap succeed');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}
module.exports = { clapComment, clapPost, unclapComment, unclapPost };
