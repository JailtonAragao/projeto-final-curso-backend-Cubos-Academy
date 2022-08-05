const express = require('express');

const validarToken = require('../middleware/validarToken');

const { uploadArquivos } = require('../controller/upload');

const rotas = express();

rotas.use(validarToken);
rotas.post('/', uploadArquivos);

module.exports = rotas;