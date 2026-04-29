const usuarios = require('../models/usuarios'); //Importamos usuarios de modelos
const jwt = require('jsonwebtoken'); //Importamos json web token


const validar = (req, res, next) =>
{
    try
    {
        //Accedemos al header de authorization 
        const hayToken = req.headers['authorization'];

        if (!hayToken)
        {
            return res.status(401).json({mensaje: "Token requerido"});
        }
        else
        {
            //comparamos token que es lo que mando el usuario, con con la clave secreta que tenemos en la base de datos
            const datos = jwt.verify(hayToken, 'secreto123');
            req.usuario = datos;
            next();
        }
    }
    catch (error)
    {
        return res.status(401).json({mensaje: 'Token invalido'});       
    }
    
};

module.exports = validar;