const knex = require('../config/conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fraseSecreta = require('../chave_secreta_jwt');

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email) {
        return res.status(404).json({ messagem: 'Para efetuar o login é obrigatório informar o email' });
    }
    if (!senha) {
        return res.status(404).json({ messagem: 'Para efetuar o login é obrigatório informar a senha' });
    }

    try {
        const login = await knex('usuarios').where({ email }).first();

        if (!login) {
            return res.status(404).json({ messagem: "Email e senha não confere" });
        }

        const usuario = login;

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(404).json({ messagem: "Email e senha não confere" });
        }

        const token = jwt.sign({ id: usuario.id }, fraseSecreta, { expiresIn: '8h' });

        const { senha: _, ...dadosUsuario } = usuario;

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        });
    } catch (error) {
        return res.status(500).json({ menssagem: error.message });
    }
}

module.exports = {
    login
}