const Redis = require('ioredis');
const logger = require('../utils/logger');

const clientRedis = new Redis();
clientRedis.on('connect', () => logger.info('Redis connected '));
module.exports = clientRedis;
