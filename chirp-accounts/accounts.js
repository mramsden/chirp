const argon = require('argon2');
const { Pool } = require('pg');
const { hash } = require('./hasher');
const logger = require('./logger');
const IllegalInputError = require('./illegalInputError');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'chirp_accounts',
  password: 'password',
  database: 'chirp_accounts',
  min: 1,
  max: 4
});

pool.connect(() => {
  logger.info('Connected to database');
});

/**
 * Creates a new account.
 * 
 * @throws IllegalInputError
 */
module.exports.createAccount = async (username, password) => {
  if (!username) {
    throw new IllegalInputError('username', 'cannot be empty');
  }
  if (!password) {
    throw new IllegalInputError('password', 'cannot be empty');
  }

  const hashedPassword = await hash(password);
  try {
    await pool.query('INSERT INTO accounts (username, password) VALUES ($1, $2);', [username, hashedPassword]);
    logger.info({ username }, 'New account created');
  } catch (e) {
    if (e.detail.startsWith(`Key (username)=(${username}) already exists`)) {
      throw new IllegalInputError('username', 'must be unique');
    }
    throw e;
  }
};
