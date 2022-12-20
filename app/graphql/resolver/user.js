const bcrypt = require('bcryptjs');
const __ = require('lodash');
const models = require('../../models');
const logger = require('../../utils/logger');
const clientRedis = require('../../configs/redis');

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
      logger.info('user created');
      return newuser;
    } catch (err) {
      return logger.error(err);
    }
  },
  createPost: async (_, args, { req }) => {
    try {
      const newpost = await models.Post.create({
        title: args.input.title,
        body: args.input.body,
        author: req.session.user.email,
      });
      const user = await models.User.findById(req.session.user._id);
      user.posts.push(newpost._id);
      await user.save();
      return newpost;
    } catch (err) {
      return logger.error(err);
    }
  },
  createComment: async (_, args, { req }) => {
    try {
      const newComment = await models.Comment.create({
        text: args.text,
        postID: args.postID,
        author: req.session.user.email,
      });
      const user = await models.User.findById(req.session.user._id);
      user.comments.push(newComment._id);
      const post = await models.Post.findById(args.postID);
      post.comments.push(newComment._id);
      await user.save();
      await post.save();
      logger.info('create comment succesfully');
      return newComment;
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
      await clientRedis.lpush(user.email, `sess:${req.session.id}`);
      await clientRedis.expire(user.email, 300);
      return logger.info('Login succeed');
    } catch (err) {
      return logger.error(err);
    }
  },

  logout: async (_, args, { req }) => {
    req.session.destroy();
  },
  follow: async (_, args, { req }) => {
    const user = await models.User.findById(args.userId).lean();
    if (!user) {
      return logger.infor('user not exist');
    }
    if (__.isEqual(user.top5follower, req.session.user._id)) {
      return logger.infor('da fl');
    } user.top5follower.push(req.session.user._id);
    return user.save();
  },

};
module.exports = User;
