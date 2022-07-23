const express = require('express');

const validarToken = require('../middleware/validarToken');
const { cadastrarUsuarios } = require('../controller/usuarios');

const rotas = express();

rotas.post('/', cadastrarUsuarios);
rotas.path('/redefinir',);

rotas.use(validarToken);

rotas.get('/',);
rotas.put('/',);


module.exports = rotas;