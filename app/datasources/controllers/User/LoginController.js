const bcrypt = require('bcrypt');
const randomBytes = require('randombytes');
const Response = require('../../utils/Response');
const models = require('../../models');
const config = require('../../../config');
const redis = require('../../utils/redis');

const login = async (_, args) => {
  try {
    const user = await models.User.findOne({ username: args.username });
    if (!user) {
      return Response.LoginResponse(false, 'User not found', null, null);
    }

    const checkpassword = await bcrypt.compare(args.password, user.password);
    if (!checkpassword) {
      return Response.LoginResponse(false, 'Password is incorrect', null, null);
    }
    if (user.status === 'Deactivated') {
      return Response.LoginResponse(false, 'Account has been disabled', null, null);
    }

    const randomtoken = randomBytes(20).toString('hex');
    const token = `${randomtoken}:${user._id}`;
    Promise.all([redis.clientRedis.setex(
      token,
      config.redisDbs.expiredTime / 1000,
      JSON.stringify({ role: user.role }),
    )]);
    return Response.LoginResponse(true, 'Login succeed', token, user);
  } catch (err) {
    return logger.error(err);
  }
};
module.exports = login;
