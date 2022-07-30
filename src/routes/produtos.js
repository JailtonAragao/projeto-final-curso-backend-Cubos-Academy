const express = require('express');

const validarToken = require('../middleware/validarToken');

const { } = require('../controller/produtos');

const rotas = express();

rotas.use(validarToken);

rotas.post('/',);
rotas.put('/',);
rotas.get('/',);
rotas.get('/:id',);
rotas.delete('/:id',);

module.exports = rotas;
