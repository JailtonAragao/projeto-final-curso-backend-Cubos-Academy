const jwt = require('jsonwebtoken');
const knex = require('knex');

const fraseSecreta = require('../chave_secreta_jwt');
// const { query } = require('../bancodedados/conexao');

const validarToken = async (req, res, next) => {
    const { authorization: autorizacao } = req.headers;

    if (!autorizacao) {
        return res.status(401).json({ messagem: 'O usuário deve está logado' });
    }

    try {
        let token = autorizacao.replace('Bearer ', "").trim();

        let { dadosUsuario } = jwt.verify(token, fraseSecreta);

        console.log(`O usuário ${dadosUsuario.nome} está utilizando o sistema`);

        // concluir o token.

        next();

    } catch (error) {

        if (error.message === 'invalid signature') {
            return res.status(400).json({ messagem: 'O usuário deve passar um token válido.' });
        }
        if (error.message === 'jwt malformed') {
            return res.status(400).json({ messagem: 'O token deve ser informado.' });
        }
        if (error.message === 'jwt expired') {
            return res.status(400).json({ messagem: 'O token expirou, adicione um novo' });
        }

        return res.status(400).json({ messagem: error.message });
    }

}

module.exports = { validarToken }