const bcrypt = require('bcrypt');
const randomBytes = require('randombytes');
const utils = require('../../../utils');
const models = require('../../models');
const config = require('../../../config');

async function register(parent, args, context, info) {
  try {
    const user = await models.User.findOne({ username: args.username });
    const email = await models.User.findOne({ email: args.email });
    if (user && email) {
      return utils.throwError('FOUND', 'User or email already exists', 302);
    }
    const salt = bcrypt.genSaltSync(10);
    const hastPassword = await bcrypt.hash(args.password, salt);
    const newuser = await models.User.create({
      username: args.username,
      email: args.email,
      password: hastPassword,
    });
    return newuser;
  } catch (err) {
    return logger.error(err);
  }
}

async function login(parent, args, context, info) {
  try {
    const { Response, clientRedis } = context.dataSources;
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
    await clientRedis.setex(token, config.redisDbs.expiredTime / 1000, user.role);
    return Response.LoginResponse(true, 'Login succeed', token, user);
  } catch (err) {
    return logger.error(err);
  }
}
async function logout(parent, args, context, info) {
  try {
    const { Response, clientRedis } = context.dataSources;
    const { user } = context;
    await clientRedis.del(user.token);
    return Response.GeneralResponse(true, 'Logout succeed');
  } catch (error) {
    return logger.error(error);
  }
}
module.exports = { register, login, logout };
