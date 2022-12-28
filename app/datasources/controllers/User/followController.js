const models = require('../../models');
const Response = require('../../utils/Response');

const follow = async (_, args, { user }) => {
  try {
    const followee = await models.Follow.find({ followee: args.followee }, { follower: user.id });
    if (!followee) {
      await models.Follow.create({
        follower: user.id,
        followee: args.followee,
      });
      return Response.GeneralResponse(true, `follow user ${args.followee} succesfully`);
    }
    return Response.GeneralResponse(false, ` user ${args.followee} followed`);
  } catch (err) { return logger.error(err); }
};
module.exports = follow;
