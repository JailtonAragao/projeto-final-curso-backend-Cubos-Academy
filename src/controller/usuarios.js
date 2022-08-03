const knex = require('../config/conexao');
const bcrypt = require('bcrypt');
const nodemailer = require('../nodemailer');

const { schemaCadastrarEditarUsuarios, schemaRedefinirSenha } = require('../validations/schemaUsuarios');

const cadastrarUsuarios = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        await schemaCadastrarEditarUsuarios.validate(req.body);

        const emailExiste = await knex('usuarios').where({ email }).first();

        if (emailExiste) {
            return res.status(404).json({ mensagem: 'O email informado já consta em nosso banco de dados' })
        }

        const criptografarSenha = await bcrypt.hash(senha, 10);

        const cadastrarUsuario = await knex('usuarios')
            .insert({ nome, email, senha: criptografarSenha })
            .returning('*');

        if (!cadastrarUsuario) {
            return res.status(404).json({ mensagem: 'Usuário não foi cadastrado' });
        }

        const enviarEmail = {
            from: 'Loja Pedreiro de Software <nao-responder@lojapedreirodesoftware.com>',
            to: email,
            subject: 'Bem vindo a Loja Pedreiro de Software',
            text: `Olá ${nome}. Você realizou um cadastro na Loja Pedreiro de Software e pode fazer o login com o email: ${email}`
        }

        nodemailer.sendMail(enviarEmail);

        return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const redefinirSenha = async (req, res) => {
    const { email, senha_antiga, senha_nova } = req.body;

    if (senha_antiga === senha_nova) {
        return res.status(404).json({ mensagem: 'A senha nova tem que ser diferente da senha antiga' });
    }

    try {
        await schemaRedefinirSenha.validate(req.body);

        const emailExiste = await knex('usuarios').where({ email }).first();

        if (!emailExiste) {
            return res.status(404).json({ mensagem: 'O email informado não consta em nosso banco de dados' });
        }

        const senhaCorreta = await bcrypt.compare(senha_antiga, emailExiste.senha);

        if (!senhaCorreta) {
            return res.status(404).json({ mensagem: "Senha Incorreta" });
        } else {
            const criptografarSenha = await bcrypt.hash(senha_nova, 10);

            const senhaAtualizada = await knex('usuarios').update({ senha: criptografarSenha }).where({ email });

            if (!senhaAtualizada) {
                return res.status(404).json({ mensagem: 'A senha não foi atualizada' });
            }

            const enviarEmail = {
                from: 'Loja Pedreiro de Software <nao-responder@lojapedreirodesoftware.com>',
                to: email,
                subject: 'Notificação - Atualização de senha',
                text: `Olá ${emailExiste.nome}. Sua senha foi atualizada com sucesso`
            }

            nodemailer.sendMail(enviarEmail);

            return res.status(204).send();
        }

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const editarPerfil = async (req, res) => {
    const { usuario } = req;

    const { nome, email, senha } = req.body;

    try {

        await schemaCadastrarEditarUsuarios.validate(req.body);

        const emailExiste = await knex('usuarios').where({ email }).first();

        if (emailExiste.id !== usuario.id && emailExiste) {
            return res.status(404).json({ mensagem: 'O email informado já consta em nosso banco de dados' });

        } else {

            const criptografarSenha = await bcrypt.hash(senha, 10);

            const usuarioAtualizado = await knex('usuarios').update({ nome, email, senha: criptografarSenha }).where('email', usuario.email);

            if (!usuarioAtualizado) {
                return res.status(404).json({ mensagem: 'O usuário não foi atualizado' });
            }

            return res.status(200).json({ mensagem: "Usuário atualizado com Sucesso!" });
        }

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const detalharPerfil = async (req, res) => {
    return res.status(200).json(req.usuario);
}

module.exports = {
    cadastrarUsuarios,
    redefinirSenha,
    detalharPerfil,
    editarPerfil
}