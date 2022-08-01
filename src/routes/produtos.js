const express = require('express');

const validarToken = require('../middleware/validarToken');

const { detalharProduto, excluirProduto, cadastrarProduto, listarProduto, editarProduto } = require('../controller/produtos');

const rotas = express();

rotas.use(validarToken);

rotas.post('/', cadastrarProduto);
rotas.put('/:id', editarProduto);
rotas.get('/', listarProduto);
rotas.get('/:id', detalharProduto);
rotas.delete('/:id', excluirProduto);

module.exports = rotas;