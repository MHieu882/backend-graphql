const { createLogger, format, transports } = require('winston');

const { combine, printf } = format;

const logger = createLogger({
  exitOnError: false,
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  format: combine(
    printf(info => {
      const splat = info[Symbol.for('splat')];
      if (splat) {
        return `[${info.level}] ${info.message} - meta: ${JSON.stringify(splat[0])}`;
      }
      return `[${info.level}] ${info.message} `;
    }),
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      stderrLevels: ['error', 'warning'],
    }),
  ],
});

module.exports = logger;
