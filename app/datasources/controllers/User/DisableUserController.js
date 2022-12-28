const models = require('../../models');
const Response = require('../../utils/Response');
const redis = require('../../utils/redis');

const disableUser = async (_, args) => {
  try {
    // await models.User.updateOne({ _id: args.id }, { status: 'Deactivated' });

    const findtoken = await redis.clientRedis.scan('0', 'MATCH', `*:${args.id}`, 'COUNT', '100');
    findtoken.forEach(async token => {
      await redis.clientRedis.del(token);
    });

    return Response.GeneralResponse(true, `Disable user ${args.id} succesfully`);
  } catch (err) {
    return logger.error(err);
  }
};
module.exports = disableUser;
