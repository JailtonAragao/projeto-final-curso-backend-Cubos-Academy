const express = require('express');
const { login } = require('../controller/login');

const rotas = express();

rotas.post('/', login);

module.exports = rotas;