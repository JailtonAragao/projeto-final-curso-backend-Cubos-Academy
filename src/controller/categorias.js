const knex = require('../config/conexao');

const bcrypt = require('bcrypt');

const listarCategoria = async (req, res) => {

    const { categorias } = req.body;

    try {
        const listarCategoria = await knex('categorias')
        .where({ id: categorias.id});

        return res.status(200).json(categorias);
    } catch (error) {
        return res.status(400).json(error.message);
    }

};

module.exports = {
    listarCategoria
};