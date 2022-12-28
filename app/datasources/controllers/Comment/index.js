const comment = require('./CommentController');
const updateComment = require('./updateCommentController');
const deleteComment = require('./deleteCommentController');
const reply = require('./replyController');

module.exports = {
  comment,
  updateComment,
  deleteComment,
  reply,
};
