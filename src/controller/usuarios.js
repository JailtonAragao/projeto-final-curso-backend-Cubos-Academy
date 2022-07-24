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

const redefinirSenha = async (req, res) => {
    const { email, senha_antiga, senha_nova } = req.body;

    if (!email) {
        return res.status(404).json({ messagem: 'O campo email é obrigatório' });
    }
    if (!senha_antiga) {
        return res.status(404).json({ messagem: 'O campo senha_antiga é obrigatório' });
    }
    if (!senha_nova) {
        return res.status(404).json({ messagem: 'O campo senha_nova é obrigatório' });
    }

    try {
        const usuario = await knex('usuarios').where({ email }).first();

        if (!usuario) {
            return res.status(404).json({ messagem: 'Usuário não encontrado' });
        }

        const senhaCorreta = await bcrypt.compare(senha_antiga, usuario.senha);

        if (!senhaCorreta) {
            return res.status(404).json({ messagem: "Senha Incorreta" });
        } else {
            const hash = await bcrypt.hash(senha_nova, 10);
            
            const senhaAtualizada = await knex('usuarios').update({ senha: hash }).where('email', email);
            
            // TO DO IMPLEMENTAR ENVIO DE EMAILS
            
            return res.status(201).send();
        }

    } catch (error) {
        return res.status(500).json({ menssagem: error.message });
    }
    
}

module.exports = {
    cadastrarUsuarios,
    redefinirSenha
}