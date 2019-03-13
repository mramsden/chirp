const { Pool } = require('pg');
const format = require('pg-format');
const logger = require('./logger');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'chirp_messages',
  password: 'password',
  database: 'chirp_messages',
  min: 1,
  max: 4
});

pool.connect(() => {
  logger.info('Connected to database');
});

const buildQuery = opf => {
  const columns = Array(opf.length).fill('%I');
  return format.withArray(`SELECT ${columns} FROM messages;`, opf);
};

module.exports.getMessages = async (opf = ['id', 'body', 'created_at']) => {
  const query = buildQuery(opf);
  logger.debug({ query }, 'Executing query');
  const res = await pool.query(query);
  return res.rows;
};

module.exports.createMessage = async body =>
  pool.query('INSERT INTO messages (body) VALUES ($1)', [body]);
