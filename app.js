require('dotenv').config();
const routes = require('./routes/auth');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/usuarios', routes);

app.listen(3000, function()
{
    console.log('Servidor corriendo en el puerto 3000');
});