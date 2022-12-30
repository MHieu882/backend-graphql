const models = require('../../models');
const { throwError } = require('../../../utils');

async function getPost(parent, args, context, info) {
  try {
    const { id } = args;
    const findpost = await models.Post.findById(id);
    if (!findpost) {
      throwError('NOT FOUND', 'User not found', 404);
    }
    return findpost;
  } catch (error) {
    throwError('Internal server error');
    return logger.error(`${error.message}\n ${error.stack}`);
  }
}
async function getPosts(parent, args, context, info) {
  try {
    const { limit, offset, ...input } = args.input;
    const findposts = await models.Post.find({ ...input }).limit(limit).skip(offset);
    if (!findposts) {
      throwError('NOT FOUND', 'User not found', 404);
    }
    return findposts;
  } catch (error) {
    throwError('Internal server error');
    return logger.error(`${error.message}\n ${error.stack}`);
  }
}
// dataloader
async function getowner(parent, args, context, info) {
  const { owner } = parent;
  if (!owner) { return null; }
  const findowner = await context.createLoaders.createownerloader.load(owner.toString());
  return findowner;
}
async function getclapCount(parent, args, context, info) {
  const { _id } = parent;
  if (!_id) { return null; }
  const countclap = await context.createLoaders.createclapCountloader.load(_id.toString());
  return countclap;
}
module.exports = {
  getPost,
  getPosts,
  getowner,
  getclapCount,
};
