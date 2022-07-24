const express = require('express');

const { listarCategoria } = require('../controller/categorias')

const rotas = express();

rotas.get('/', listarCategoria);

module.exports = rotas;