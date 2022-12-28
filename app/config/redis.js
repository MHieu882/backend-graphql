module.exports = {
  redisDbs: {
    authDb: {
      // host: process.env.REDIS_URL,
      // posrt: 18693,
      // password: process.env.SKIP_TLS,
    },
    secret: process.env.REDIS_SECRET,
    expiredTime: parseInt(process.env.EXPIRED_TIME, 10),
  },
};
