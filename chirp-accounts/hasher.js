const argon = require('argon2');

module.exports.hash = async (string) =>
  argon.hash(string, { type: argon.argon2i });
