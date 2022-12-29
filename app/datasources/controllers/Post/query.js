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
module.exports = {
  getPost,
  getPosts,
};
