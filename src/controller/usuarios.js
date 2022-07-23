const knex = require('../config/conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuarios = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome) {
        return res.status(404).json({ messagem: 'O campo nome é obrigatório' });
    }
    if (!email) {
        return res.status(404).json({ messagem: 'O campo email é obrigatório' });
    }
    if (!senha) {
        return res.status(404).json({ messagem: 'O campo senha é obrigatório' });
    }

    try {

        const emailExistente = await knex('usuarios').where({ email }).first();

        if (emailExistente) {
            return res.status(404).json({ messagem: 'O email informado já consta em nosso banco de dados' })
        }

        const criptografarSenha = await bcrypt.hash(senha, 10);

        const cadastrarUsuario = await knex('usuarios')
            .insert({ nome, email, senha: criptografarSenha })
            .returning('*');

        if (!cadastrarUsuario) {
            return res.status(404).json({ menssagem: 'Usuário não foi cadastrado' });
        }

        return res.status(201).json({ menssagem: 'Usuário cadastrado com sucesso' });

    } catch (error) {
        return res.status(500).json({ messagem: error.message });
    }
}

module.exports = {
    cadastrarUsuarios
}