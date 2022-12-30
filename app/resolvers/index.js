const queryResolver = require('./query');
const mutationResolver = require('./mutation');
const Postresolver = require('./post');
const Commentsolver = require('./comment');
const Usersolver = require('./user');
const DateTimesolver = require('./DateTime');

module.exports = {
  Query: queryResolver,
  Mutation: mutationResolver,
  Post: Postresolver,
  Comment: Commentsolver,
  User: Usersolver,
  DateTime: DateTimesolver,
};
