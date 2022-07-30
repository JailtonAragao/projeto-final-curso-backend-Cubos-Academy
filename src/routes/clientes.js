const express = require('express');

const validarToken = require('../middleware/validarToken');

const { cadastrarCliente } = require('../controller/clientes');

const rotas = express();

rotas.use(validarToken);

rotas.post('/', cadastrarCliente);
// rotas.put('/', editarCliente);
// rotas.get('/', listarCliente);
// rotas.get('/:id', detalharCliente);

module.exports = rotas;