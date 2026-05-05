const { Pool } = require('pg'); //Pool es la clase de pg
require('dotenv').config();

const pool = new Pool //Es la instancia de nuestra conexion 
({
    connectionString: process.env.DATABASE_URL, //Es la conexion a nuestra base de datos
    ssl: {rejectUnauthorized : false } //Railway Recahzaria la conexion sino tuvieramos esta linea
});

module.exports = pool;