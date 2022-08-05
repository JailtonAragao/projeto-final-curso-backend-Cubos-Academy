const express = require('express');

const validarToken = require('../middleware/validarToken');

const { cadastrarPedido, listarPedidos } = require('../controller/pedidos');

const rotas = express();

rotas.use(validarToken);

rotas.post('/', cadastrarPedido);
rotas.get('/', listarPedidos);

module.exports = rotas;