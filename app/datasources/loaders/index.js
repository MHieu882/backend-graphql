const postloader = require('./post');
const commentloader = require('./comment');
const userloader = require('./user');

module.exports = {
  ...postloader,
  ...commentloader,
  ...userloader,
};
