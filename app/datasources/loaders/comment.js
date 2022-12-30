const mongoose = require('mongoose');
const modules = require('../models');

async function batchUserComment(keys) {
  // const users = await modules.User.find({ _id: { $in: keys } });
  console.log('batchUserComment');
}

async function batchPostComment(keys) {
  // const users = await modules.User.find({ _id: { $in: keys } });
  console.log('batchPostComment');
}
module.exports = { batchUserComment, batchPostComment };
