const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('../config');
require('./models');
const controllers = require('./controllers');
const loaders = require('./loaders');
const Response = require('./utils/Response');
const { clientRedis } = require('./utils/redis');

if (config.nodeEnv !== 'test') {
  mongoose.set('strictQuery', false);
  mongoose.connect(config.mongo.database, config.mongo.options, err => {
    if (err) {
      logger.info(`mongodb connection failed ${err}`);
    } else {
      logger.info('hello from mongodb');
    }
  });
}

module.exports = () => ({ ...controllers, loaders, Response, clientRedis });
