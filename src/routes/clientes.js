const express = require('express');

const validarToken = require('../middleware/validarToken');

const { editarCliente, listarClientes, detalharCliente } = require('../controller/clientes');

const rotas = express();

rotas.use(validarToken);

rotas.post('/',);
rotas.put('/:id', editarCliente);
rotas.get('/', listarClientes);
rotas.get('/:id', detalharCliente);

module.exports = rotas;