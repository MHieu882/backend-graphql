const typeDefs = `
  input inputUser{
    email: String
    password: String   
  }
  input login{
    email: String!
    password: String!
  }
  input createPost{
    title:String!
    body:String!
  }
  type User {
    _id:ID
    email: String
    name:String 
    posts:[Post]
    comments:[Comment]
    follower:[User]
    following:[User]
    
  }
  type Post{
    _id:ID
    author:User!
    title:String!
    body:String!
    comments:[Comment!]!
    claps:[Clap]
  }
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
  }
  type Clap{
    author:[User]
  }
  type Follower{
    follower:[User]
  }
  type Query {
    #find
    Alluser: [User]
    AllPosts:[Post]
  }
  type Mutation{
    #user
    createUser(input:inputUser!):User!
    login(input:login):User!
    createPost(input : createPost):Post!
    createComment(text:String,postID:String):Comment!
    follow(userId:String):User!
  }
`;
// newPost(title: String!, body: String!, author: String!):Post
// newComment(author:String,text:String):Comment
module.exports = typeDefs;
