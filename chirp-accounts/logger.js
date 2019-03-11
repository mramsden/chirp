const pino = require('pino');

module.exports = pino({
  name: 'chirp-accounts',
  level: 'debug'
});
