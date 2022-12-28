const register = require('./RegisterController');
const login = require('./LoginController');
const disableUser = require('./DisableUserController');
const follow = require('./followController');
const unfollow = require('./unfollowController');

module.exports = {
  register,
  login,
  disableUser,
  follow,
  unfollow,
};
