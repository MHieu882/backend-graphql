const models = require('../../models');
const Response = require('../../utils/Response');
const redis = require('../../utils/redis');

const disableUser = async (_, args) => {
  try {
    await models.User.updateOne({ _id: args.id }, { status: 'Deactivated' });

    console.log(await redis.clientRedis.del(redis.clientRedis.scan('0', 'MATCH', `*:${args.id}`, 'COUNT', '100')));
    return Response.GeneralResponse(true, `Disable user ${args.id} succesfully`);
  } catch (err) {
    return logger.error(err);
  }
};
module.exports = disableUser;
