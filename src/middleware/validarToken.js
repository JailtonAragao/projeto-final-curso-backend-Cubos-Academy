const jwt = require('jsonwebtoken');
const knex = require('knex');

const fraseSecreta = require('../chave_secreta_jwt');

const validarToken = async (req, res, next) => {
    const { authorization: autorizacao } = req.headers;

    if (!autorizacao) {
        return res.status(401).json({ messagem: 'O usuário deve efetuar o login' });
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, fraseSecreta);

        const usuario = await knex('usuarios').where({ id }).first();

        if (!usuario) {
            return res.status(404).json('Usuario não encontrado');
        }

        const { senha, ...dadosUsuario } = usuario;

        req.usuario = dadosUsuario;

        next();
    } catch (error) {
        if (error.message === "jwt expired") {
            return res.status(400).json('Token expirado, informar um novo')
        }
        if (error.message === "jwt malformed") {
            return res.status(400).json('Informar um token válido')
        }
        return res.status(400).json(error.message);
    }
}

module.exports = validarToken;