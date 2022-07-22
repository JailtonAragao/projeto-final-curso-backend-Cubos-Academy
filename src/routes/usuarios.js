const express = require('express');

const { validarToken } = require('../middleware/validarToken');

const rotas = express();

rotas.post('/',);
rotas.path('/redefinir',);

rotas.use(validarToken);

rotas.get('/',);
rotas.put('/',);


module.exports = rotas;