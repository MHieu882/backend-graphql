const { throwError } = require('../../../utils');
const models = require('../../models');

async function getme(parent, args, context, info) {
  try {
    const { user } = context;
    const finduser = await models.User.findById(user.id);
    if (!finduser) {
      throwError('NOT FOUND', 'User not found', 404);
    }
    return finduser;
  } catch (error) {
    throwError('Internal server error');
    return logger.error(`${error.message}\n ${error.stack}`);
  }
}

async function getUsers(parent, args, context, info) {
  try {
    const { name } = args;
    const findbyname = await models.User.find({ username: name });
    if (!findbyname) {
      throwError('NOT FOUND', 'User not found', 404);
    }
    return findbyname;
  } catch (error) {
    throwError('Internal server error');
    return logger.error(`${error.message}\n ${error.stack}`);
  }
}
// dataloader
async function getfollowCounts(parent, args, context, info) {
  const { _id } = parent;
  if (!_id) { return null; }
  const countclap = await context.createLoaders.createUserFollowloader.load(_id.toString());
  return countclap;
}

module.exports = {
  getme,
  getUsers,
  getfollowCounts,
};
