const models = require('../../models');

async function follow(parent, args, context, info) {
  try {
    const { user } = context;
    const { Response } = context.dataSources;

    const followee = await models.Follow.findOne({ followee: args.followee }, { follower: user.id });
    if (!followee) {
      await models.Follow.create({
        follower: user.id,
        followee: args.followee,
      });
      return Response.GeneralResponse(true, `follow user ${args.followee} succesfully`);
    }
    return Response.GeneralResponse(false, 'follow  fail');
  } catch (err) { return logger.error(err); }
}
async function unfollow(parent, args, context, info) {
  try {
    const { Response } = context.dataSources;
    const { user } = context;
    const unfollowee = await models.Follow.deleteMany({ followee: args.followee }, { follower: user.id });
    if (!unfollowee) {
      return Response.GeneralResponse(false, 'not found');
    }
    return Response.GeneralResponse(true, ` user ${args.followee} unfollowed sucessully`);
  } catch (err) { return logger.error(err); }
}
module.exports = { follow, unfollow };
