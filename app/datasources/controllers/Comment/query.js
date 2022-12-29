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
// dataloader
module.exports = { getreplies };
