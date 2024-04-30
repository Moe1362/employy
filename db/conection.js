const { Pool } = require('pg');
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool(
    {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
},
console.log('Connected to the database')
);
pool.connect();

module.exports = pool;


