const pool = require('../config/db');

//Creamos una funcion que recibira tres parametros
const crearUsuario = async (nombre, email, password) =>
{
    //usamos la funcion query de la clase pool para insertar el nuevo usuario
    //Esta funcion .query despues de insertar devuelve un arreglo con la informacion
    //Y tenemos un arreglo por el RETURNING*
    const insert = await pool.query(
        'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING*', 
        [nombre, email, password]
    );
    //Devuelve el usario recien creado, es como cuando creas un usuario y automaticamente lo devuelve
    return insert.rows[0];
};

//Creamos una funcion que recibira un parametro email
const buscarEmail = async (email) =>
{
    const buscar = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1', [email]
    );
    return buscar.rows[0];
}

module.exports = { crearUsuario, buscarEmail };