const express = require('express');

const validarToken = require('../middleware/validarToken');

const { cadastrarUsuarios, redefinirSenha, detalharPerfil } = require('../controller/usuarios');

const rotas = express();

rotas.post('/', cadastrarUsuarios);
rotas.patch('/redefinir', redefinirSenha);

rotas.use(validarToken);

rotas.get('/', detalharPerfil);
rotas.put('/',);

module.exports = rotas;