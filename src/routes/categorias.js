const express = require('express');

const { listarCategorias } = require('../controller/categorias')

const rotas = express();

rotas.get('/', listarCategorias);

module.exports = rotas;