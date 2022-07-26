const knex = require('../config/conexao');
const bcrypt = require('bcrypt');
const nodemailer = require('../nodemailer');

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

        const emailExiste = await knex('usuarios').where({ email }).first();

        if (emailExiste) {
            return res.status(404).json({ messagem: 'O email informado já consta em nosso banco de dados' })
        }

        const criptografarSenha = await bcrypt.hash(senha, 10);

        const cadastrarUsuario = await knex('usuarios')
            .insert({ nome, email, senha: criptografarSenha })
            .returning('*');

        if (!cadastrarUsuario) {
            return res.status(404).json({ menssagem: 'Usuário não foi cadastrado' });
        }

        const enviarEmail = {
            from: 'Loja Pedreiro de Software <nao-responder@lojapedreirodesoftware.com>',
            to: email,
            subject: 'Bem vindo a Loja Pedreiro de Software',
            text: `Olá ${nome}. Você realizou um cadastro na Loja Pedreiro de Software e pode fazer o login com o email: ${email}`
        }

        nodemailer.sendMail(enviarEmail);

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
    if (senha_antiga === senha_nova) {
        return res.status(404).json({ messagem: 'A senha nova tem que ser diferente da senha antiga' });
    }

    try {
        const emailExiste = await knex('usuarios').where({ email }).first();

        if (!emailExiste) {
            return res.status(404).json({ messagem: 'O email informado não consta em nosso banco de dados' });
        }

        const senhaCorreta = await bcrypt.compare(senha_antiga, emailExiste.senha);

        if (!senhaCorreta) {
            return res.status(404).json({ messagem: "Senha Incorreta" });
        } else {
            const criptografarSenha = await bcrypt.hash(senha_nova, 10);

            const senhaAtualizada = await knex('usuarios').update({ senha: criptografarSenha }).where({ email });

            if (!senhaAtualizada) {
                return res.status(404).json({ menssagem: 'A senha não foi atualizada' });
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
        return res.status(500).json({ menssagem: error.message });
    }
}

const editarPerfil = async (req, res) => {
    const { usuario } = req;

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
        const emailExiste = await knex('usuarios').where({ email }).first();

        if (emailExiste.id !== usuario.id && emailExiste) {
            return res.status(404).json({ messagem: 'O email informado já consta em nosso banco de dados' });

        } else {

            const criptografarSenha = await bcrypt.hash(senha, 10);

            const usuarioAtualizado = await knex('usuarios').update({ nome, email, senha: criptografarSenha }).where('email', usuario.email);

            if (!usuarioAtualizado) {
                return res.status(404).json({ messagem: 'O usuário não foi atualizado' });
            }

            return res.status(200).json({ menssagem: "Usuário atualizado com Sucesso!" });
        }

    } catch (error) {
        return res.status(500).json({ menssagem: error.message });
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