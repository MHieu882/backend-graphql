const { register, login, logout } = require('./AuthController');
const { disableUser, getuserbyAdmin } = require('./AdminController');
const { follow, unfollow } = require('./FollowController');
const { getme, getUsers, getfollowCounts } = require('./queryUser');

module.exports = {
  // mutation
  register,
  login,
  follow,
  unfollow,
  logout,
  // admin
  getuserbyAdmin,
  disableUser,
  // query
  getme,
  getUsers,
  // dataloader
  getfollowCounts,
};
