const { comment, updateComment, deleteComment, reply } = require('./CommentController');
const { getreplies, getUserComment, getPostComment } = require('./query');

module.exports = {
  comment,
  updateComment,
  deleteComment,
  reply,
  // query
  getreplies,
  getUserComment,
  getPostComment,
};
