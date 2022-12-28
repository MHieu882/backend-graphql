const { gql } = require('apollo-server-express');
const redis = require('./datasources/utils/redis');
const { scope } = require('./utils');
const utils = require('./utils');

async function createContext({ req }) {
  const { query } = req.body;
  const queryAfterParse = gql(query);
  const token = req.headers.authorization;
  const user = JSON.parse(await redis.clientRedis.scan('0', 'MATCH', `*:${args.id}`, 'COUNT', '100'))););
  if (!user) {
    if (!scope.guestScope.some(operation => operation === queryAfterParse.definitions[0]
      .selectionSet.selections[0].name.value)) {
      utils.throwError('FORBIDDEN', 'Forbidden', 403);
    }
  } else if (user.role === 'User') {
    if (!scope.userScope.some(operation => operation === queryAfterParse.definitions[0]
      .selectionSet.selections[0].name.value)) {
      utils.throwError('FORBIDDEN', 'Forbidden', 403);
    }
  }
  return { query, user, req };
}

module.exports = createContext;
