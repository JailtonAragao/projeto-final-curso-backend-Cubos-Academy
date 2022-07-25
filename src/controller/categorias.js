const knex = require('../config/conexao');

const listarCategoria = async (req, res) => {
    const listarCategoria = await knex('categorias');
    return res.status(200).json(listarCategoria);

};

module.exports = {
    listarCategoria
};