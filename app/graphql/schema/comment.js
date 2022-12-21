const Comment = `
type Comment{
    _id:ID
    author:User!
    text:String!
    post:Post!
    subcomment:[Subcomment]
  }
  type Subcomment{
    author:[User]
    text:String!
    CommentID:ID
  }`;
module.exports = Comment;
