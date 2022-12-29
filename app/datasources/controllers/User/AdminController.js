/* eslint-disable no-await-in-loop */
const models = require('../../models');
const { throwError } = require('../../../utils');

async function disableUser(parent, args, context, info) {
  try {
    const { Response, clientRedis } = context.dataSources;
    const { id } = args;
    const user = await models.User.findById(id);
    if (!user) {
      return Response.GeneralResponse(true, `Disable user ${args.id} fail`);
    }
    await models.User.updateOne({ _id: id }, { status: 'Deactivated' });
    let cursor = 0;
    while (cursor !== '0') {
      const list = await clientRedis.scan(cursor, 'MATCH', `*${user._id}`, 'COUNT', '10');
      cursor = list[0];
      if (list) {
        await clientRedis.del(list[1]);
      }
    }
    return Response.GeneralResponse(true, `Disable user ${args.id} succesfully`);
  } catch (err) {
    return logger.error(err);
  }
}
async function getuserbyAdmin(parent, args, context, info) {
  try {
    const { ...input } = args.input;
    const finduser = await models.User.findOne(input);
    if (!finduser) {
      throwError('NOT FOUND', 'User not found', 404);
    }
    return finduser;
  } catch (error) {
    throwError('Internal server error');
    return logger.error(`${error.message}\n ${error.stack}`);
  }
}
module.exports = { disableUser, getuserbyAdmin };
