const { comment, updateComment, deleteComment, reply } = require('./CommentController');
const { getreplies } = require('./query');

module.exports = {
  comment,
  updateComment,
  deleteComment,
  reply,
  // query
  getreplies,
};
