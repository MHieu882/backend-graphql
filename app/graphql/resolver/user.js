const bcrypt = require('bcryptjs');
const __ = require('lodash');
const { GraphQLError } = require('graphql');
const models = require('../../models');
const logger = require('../../utils/logger');
const clientRedis = require('../../configs/redis');

const User = {
  createUser: async (_, args) => {
    try {
      const user = await models.User.findOne({ email: args.input.email });
      if (user) {
        return new GraphQLError('User already exists', { extensions: {
          code: 'FOUND',
          http: { status: 302 },
        } });
      }
      const salt = bcrypt.genSaltSync(10);
      const hastPassword = await bcrypt.hash(args.input.password, salt);
      const newuser = await models.User.create({
        name: args.input.name,
        email: args.input.email,
        password: hastPassword,
      });
      await new GraphQLError('Successfully', { extensions: {
        code: 'CREATED',
        http: { status: 201 },
      } });
      return newuser;
    } catch (err) {
      return logger.error(err);
    }
  },
  login: async (_, args, { req }) => {
    try {
      const user = await models.User.findOne({ email: args.input.email });
      if (!user) {
        return new GraphQLError('User  not Found', {
          extensions: {
            code: 'NOT FOUND',
            http: { status: 404 },
          },
        });
      }
      const checkpassword = await bcrypt.compare(args.input.password, user.password);
      if (!checkpassword) {
        return new GraphQLError('Wrong password', { extensions: {
          code: 'Unauthorized',
          http: { status: 401 },
        } });
      }
      if (user.isbanned) {
        return new GraphQLError('Banned', {
          extensions: {
            code: 'Forbidden',
            http: { status: 403 },
          },
        });
      }
      req.session.user = {
        _id: user._id,
        email: user.email,
      };
      await clientRedis.lpush(user.email, `sess:${req.session.id}`);
      await clientRedis.expire(user.email, 300);
      return new GraphQLError('Password OK', {
        extensions: {
          code: 'OK',
          http: { status: 200 },
        },
      });
    } catch (err) {
      return logger.error(err);
    }
  },
  logout: async (_, args, { req }) => {
    req.session.destroy();
    return 'log out';
  },
  follow: async (_, args, { req }) => {
    try {
      const userfl = await models.User.findById(args.userId);
      const user = await models.User.findById(req.session.user._id);
      if (!user) {
        return new GraphQLError('User is not Found', {
          extensions: {
            code: 'NOT FOUND',
            http: { status: 404 },
          },
        });
      }
      if (__.isEqual(user.follower, ` new ObjectId('${req.session.user._id}')`)) {
        return new GraphQLError('User was fl', {
          extensions: {
            code: 'Too Many Requests',
            http: { status: 429 },
          },
        });
      }
      userfl.follower.push(req.session.user._id);
      user.following.push(userfl._id);
      userfl.save();
      // for flwer
      const fltable = await models.follow.find({ author: userfl.email });
      if (!fltable[0]) {
        await models.follow.create({
          author: userfl.email,
          follower: req.session.user._id,
        });
      }
      fltable[0].follower.push(req.session.user._id);
      fltable[0].save();

      // for user
      const userfltable = await models.follow.find({ author: req.session.user.email });
      if (!userfltable[0]) {
        await models.follow.create({
          author: req.session.user.email,
          following: userfl._id,
        });
      }
      userfltable[0].following.push(userfl._id);
      userfltable[0].save();
      return user.save();
    } catch (err) { return logger.error(err); }
  },
  changePassword: async (_, args, { req }) => {
    try {
      const user = await models.User.findOne({ email: req.session.user.email });
      if (!user) {
        return new GraphQLError('User not Found', {
          extensions: {
            code: 'NOT FOUND',
            http: { status: 404 },
          },
        });
      }
      const checkpassword = await bcrypt.compare(args.oldPassword, user.password);
      if (!checkpassword) {
        return new GraphQLError('Wrong password', {
          extensions: {
            code: 'Unauthorized',
            http: { status: 401 },
          },
        });
      }
      const salt = bcrypt.genSaltSync(10);
      const hastPassword = await bcrypt.hash(args.newPassword, salt);
      await models.User.updateOne({ email: req.session.user.email }, { password: hastPassword });
      req.session.destroy();
      return new GraphQLError('Password OK', {
        extensions: {
          code: 'OK',
          http: { status: 200 },
        },
      });
    } catch (err) {
      return logger.error(err);
    }
  },
  // reset password

};
module.exports = User;
