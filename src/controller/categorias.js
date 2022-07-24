const knex = require('../config/conexao');
// const bcrypt = require('bcrypt');
const listarCategoria = async (req, res) => {
    // const { categorias } = req.body;
    try {
        const categorias = await knex('categorias').returning('*');
        // .where({ id: categorias.id});
        return res.status(200).json(categorias);
    } catch (error) {
        return res.status(500).json({ menssagem: error.message });
    }
};

module.exports = {
    listarCategoria
};