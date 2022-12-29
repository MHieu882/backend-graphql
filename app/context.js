const { gql } = require('apollo-server-express');
const redis = require('./datasources/utils/redis');
const { scope, throwError } = require('./utils');

async function createContext({ req }) {
  const { query } = req.body;
  const queryAfterParse = gql(query);
  const token = req.headers.authorization;
  if (!token) {
    if (!scope.guestScope.some(operation => operation === queryAfterParse.definitions[0]
      .selectionSet.selections[0].name.value)) {
      throwError('FORBIDDEN', 'Forbidden', 403);
    }
    return '';
  }
  const role = await redis.clientRedis.get(token);
  const user = {
    role,
    token,
    id: token.split(':')[1],
  };
  if (role === 'User') {
    if (!scope.userScope.some(operation => operation === queryAfterParse.definitions[0]
      .selectionSet.selections[0].name.value)) {
      throwError('FORBIDDEN', 'Forbidden', 403);
    }
  }
  return { user };
}

module.exports = createContext;
