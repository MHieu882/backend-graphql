const { User } = require('../models');
const modules = require('../models');

async function batchUserComment(keys) {
  const users = await modules.User.find({ _id: { $in: keys } });
}
