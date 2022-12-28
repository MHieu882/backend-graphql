const models = require('../../models');
const Response = require('../../utils/Response');

const unfollow = async (_, args, { user }) => {
  try {
    const unfollowee = await models.Follow.deleteMany({ followee: args.followee }, { follower: user.id });
    if (!unfollowee) {
      return Response.GeneralResponse(false, 'not found');
    }
    return Response.GeneralResponse(true, ` user ${args.followee} unfollowed sucessully`);
  } catch (err) { return logger.error(err); }
};
module.exports = unfollow;
