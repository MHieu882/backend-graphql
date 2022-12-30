const mongoose = require('mongoose');
const models = require('../models');

async function batchOwnerOfPost(userids) {
  try {
    const users = await models.User.find({ _id: { $in: userids } });
    const Mapuser = {};
    users.forEach(user => {
      Mapuser[user.id.toString()] = user;
    });
    return userids.map(userid => Mapuser[userid]);
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throw err;
  }
}
async function batchClapCount(postids) {
  try {
    const resetids = postids.map(id => mongoose.Types.ObjectId(id));
    const clapCountMap = {};
    const clapcount = await models.Clap.aggregate([
      {
        $match: { post: { $in: resetids } },
      },
      {
        $group: {
          _id: '$post',
          count: { $sum: '$count' },
        },
      },
    ]);
    clapcount.forEach(item => {
      clapCountMap[item._id.toString()] = item.count;
    });
    return postids.map(postid => clapCountMap[postid] || 0);
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throw err;
  }
}
module.exports = { batchOwnerOfPost, batchClapCount };
