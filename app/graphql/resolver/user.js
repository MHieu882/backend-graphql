const bcrypt = require('bcryptjs');
const models = require('../../models');
const logger = require('../../utils/logger');

const User = {
  createUser: async (_, args) => {
    try {
      const user = await models.User.findOne({ email: args.input.email });
      if (user) {
        return logger.info('User already exists');
      }
      const salt = bcrypt.genSaltSync(10);
      const hastPassword = await bcrypt.hash(args.input.password, salt);
      const newuser = await models.User.create({
        name: args.input.name,
        email: args.input.email,
        password: hastPassword,
      });
      return newuser;
    } catch (err) {
      return logger.error(err);
    }
  },
  login: async (_, args, { req }) => {
    try {
      const user = await models.User.findOne({ email: args.input.email });
      if (!user) {
        return logger.info('User not exists');
      }
      const checkpassword = await bcrypt.compare(args.input.password, user.password);
      if (!checkpassword) {
        return logger.info('Password invalid');
      }
      if (user.isbanned) {
        return logger.info('Banned');
      }
      req.session.user = {
        _id: user._id,
        email: user.email,
      };
      return logger.info('Login succeed');
    } catch (err) {
      return logger.error(err);
    }
  },
  createPost: async (_, args, { req }) => {
    try {
      const newpost = await models.Post.create({
        title: args.input.title,
        body: args.input.body,
        author: req.session.email,
      });
      const findUser = await models.User.find({ email: req.session.email });
      findUser.posts.push(newpost._id);
      await findUser.save();
      return newpost;
    } catch (err) {
      return logger.error(err);
    }
  },
};
module.exports = User;
