const { Pool } = require('pg');

// Aqui confirguramos nossa conexão com o banco de dados (PostgreSQL)
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cruddb',
  password: '1234',
  port: 5432,
});

module.exports = pool;
