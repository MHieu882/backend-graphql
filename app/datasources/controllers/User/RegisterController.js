const bcrypt = require('bcrypt');
const utils = require('../../../utils');
const models = require('../../models');

const register = async (_, args) => {
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
};
module.exports = register;
