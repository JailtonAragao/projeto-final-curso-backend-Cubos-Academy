const express = require('express');

const validarToken = require('../middleware/validarToken');

const { detalharProduto, excluirProduto } = require('../controller/produtos');

const rotas = express();

rotas.use(validarToken);

rotas.post('/', cadastrarProduto);
rotas.put('/', editarProduto);
rotas.get('/', listarProduto);
rotas.get('/:id', detalharProduto);
rotas.delete('/:id', excluirProduto);

module.exports = rotas;