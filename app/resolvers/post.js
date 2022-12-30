function getowner(parent, args, context, info) {
  return context.dataSources.PostController.getowner(parent, args, context, info);
}
function getclapCount(parent, args, context, info) {
  return context.dataSources.PostController.getclapCount(parent, args, context, info);
}

module.exports = { owner: getowner,
  clapCount: getclapCount };
