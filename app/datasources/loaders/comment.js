const modules = require('../models');

async function batchUserComment(keys) {
  const users = await modules.User.find({ _id: { $in: keys } });
  const mapusercomment = {};
  users.forEach(user => { mapusercomment[user.id] = user; });
  return keys.map(key => mapusercomment[key] || 0);
}

async function batchPostComment(keys) {
  const posts = await modules.Post.find({ _id: { $in: keys } });
  const mappostcomment = {};
  posts.forEach(post => { mappostcomment[post.id] = post; });
  return keys.map(key => mappostcomment[key] || 0);
}
module.exports = { batchUserComment, batchPostComment };
