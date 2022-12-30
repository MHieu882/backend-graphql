// folow

function getfollowCount(parent, args, context, info) {
  return context.dataSources.UserController.getfollowCounts(parent, args, context, info);
}

module.exports = { followerCount: getfollowCount };
