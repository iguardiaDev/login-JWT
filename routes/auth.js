const express = require('express'); //importamos express
const router = express.Router(); // importamos router que servira como puerta para poder usar las funciones
const { perfil, registrar, login } = require('../controllers/auth'); //Importamos la funcion registrar 
const validar = require('../middleware/verificarTokens');

router.post('/registro', registrar);
router.post('/login',  login);
router.get('/perfil', validar, perfil);

module.exports = router;

