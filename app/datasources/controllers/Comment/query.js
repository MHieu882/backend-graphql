const models = require('../../models');
const { throwError } = require('../../../utils');

async function getreplies(parent, args, context, info) {
  try {
    const { limit, offset, commentId } = args.input;
    const findRep = await models.Comment.find({ parent: { $in: commentId } }).limit(limit).skip(offset);
    if (!findRep) {
      throwError('NOT FOUND', 'User not found', 404);
    }
    return findRep;
  } catch (error) {
    throwError('Internal server error');
    return logger.error(`${error.message}\n ${error.stack}`);
  }
}
async function getcomment() {
  try {
    const fidcomments = await models.Comment.find();
    if (!fidcomments) {
      throwError('NOT FOUND', 'empty', 404);
    }
    return fidcomments;
  } catch (error) {
    throwError('Internal server error');
    return logger.error(`${error.message}\n ${error.stack}`);
  }
}
// dataloader
async function getUserComment(parent, args, context, info) {
  try {
    const { user } = parent;
    if (!user) {
      return null;
    }
    const userscomment = await context.createLoaders.createUsercommentloader.load(user.toString());
    return userscomment;
  } catch (error) {
    throwError('Internal server error');
    return logger.error(`${error.message}\n ${error.stack}`);
  }
}
async function getPostComment(parent, args, context, info) {
  try {
    const { post } = parent;
    if (!post) { return null; }
    const userspost = await context.createLoaders.createPostcommentloader.load(post.toString());
    return userspost;
  } catch (error) {
    throwError('Internal server error');
    return logger.error(`${error.message}\n ${error.stack}`);
  }
}
module.exports = { getreplies, getcomment, getUserComment, getPostComment };
