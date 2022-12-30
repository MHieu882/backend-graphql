// follow count
const { mongoose } = require('mongoose');
const models = require('../models');

async function batchUserFollow(keys) {
  const resetid = keys.map(key => mongoose.Types.ObjectId(key));

  const followCount = await models.Follow.aggregate([
    {
      $match: { followee: { $in: resetid } },
    },
    {
      $group: {
        _id: '$followee',
        count: { $sum: 1 },
      },
    },
  ]);
  const followersMap = {};
  followCount.forEach(followerCount => {
    followersMap[followerCount._id.toString()] = followerCount.count;
  });
  return keys.map(id => followersMap[id] || 0);
}
module.exports = { batchUserFollow };
