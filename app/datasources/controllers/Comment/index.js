const { comment, updateComment, deleteComment, reply } = require('./CommentController');
const { getreplies, getcomment, getUserComment, getPostComment } = require('./query');

module.exports = {
  comment,
  updateComment,
  deleteComment,
  reply,
  // query
  getcomment,
  getreplies,
  getUserComment,
  getPostComment,
};
