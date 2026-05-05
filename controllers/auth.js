const bcrypt = require('bcrypt'); //Importamos la herramienta bcrypt
const {crearUsuario, buscarEmail} = require('../models/usuarios'); //Importamos usuarios de modelos
const jwt = require('jsonwebtoken'); //Importamos json web token


//Creamos una funcion asincrona para registrar el nuevo usuario
const registrar = async (req, res) =>
{
    try
    {
        //Obtenemos del cliente estos datos
        const {nombre, email, password} = req.body;

        const usuarioExiste = await buscarEmail(email);
        if(usuarioExiste)
        {
            res.status(400).json({mensaje: "El email ya existe"});
        }

        //await para que espere a que se termine de encriptar la contraseña, el 10 es para los saaltos de seguridad
        //Pueden ser 8, 10 y 12, pero entre mas alto mas lento, pero mas seguro
        const passEncriptada = await bcrypt.hash(password, 10);
        
        const usuario = crearUsuario(nombre, email, passEncriptada);
        
        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario:
            {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });
    }
    catch (error)
    {
        console.log(error);
        res.status(500).json({mensaje: "Error al registrar el usuario"});
    }
};

//Funcion para poder hacer log in con ususarios registrados
const login = async (req, res) =>
{
    try
    {
        //Obtenemos esos datos del json que nos da el usuario
        const {email, password} = req.body;

        //Comparamos el correo que ingreso el usuario con los del arreglo
        const loginUsuario = await buscarEmail(email);
        if(!loginUsuario)
        {
            return res.status(400).json({mensaje: "Usuario no encontrado"});
        }

        //Comparamos la contraseña ingresada con la del arreglo
        const passwordCorrecta = await bcrypt.compare(password, loginUsuario.password);
        if(!passwordCorrecta)
        {
            return res.status(400).json({Mensaje: "Contraseña incorrecta"});
        }
        else
        {

            //jsonWebToken consta de un Header, payload y signature
            const token = jwt.sign(
                {id: loginUsuario.id, email: loginUsuario.email}, //Payload
                "secreto123", //Llave secreta
                {expiresIn: '1h'} //Options: que expira en una hora
            );

             return res.status(200).json({Mensaje: "Log in exitoso", token: token});
        }
    }
    catch(error)
    {
        return res.status(500).json({Mensaje: "Login fallido"});
    }

};

const perfil = async (req, res) =>
{
    res.status(200).json({mensaje: "Bienvenido", usuario: req.usuario});
};

module.exports = {perfil, registrar, login};