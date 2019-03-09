const pino = require('pino');

module.exports = pino({
  name: 'chirp-messages',
  level: 'debug'
});
