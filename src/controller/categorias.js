const knex = require('../config/conexao');

const listarCategoria = async (req, res) => {
    const { id } = req.categorias;
    return res.status(200).json(req.categorias);

};

module.exports = {
    listarCategoria
};