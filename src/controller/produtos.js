const knex = require('../config/conexao');

const detalharProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoExiste = await knex('produtos').where({ id }).first();

        if (!produtoExiste) {
            return res.status(404).json({ menssagem: "O produto não existe em nosso banco de dados." });
        }

        return res.status(200).json(produtoExiste);

    } catch (error) {
        return res.status(500).json({ menssagem: error.message });
    }
}

const excluirProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoExiste = await knex('produtos').where({ id }).first();

        if (!produtoExiste) {
            return res.status(404).json({ menssagem: "O produto não existe em nosso banco de dados." });
        }

        const deletarProduto = await knex('produtos').where({ id }).del();

        if (!deletarProduto) {
            return res.status(404).json({ menssagem: "O produto não foi excluido" });
        }

        return res.status(200).json({ menssagem: "Produto excluido com sucesso" });

    } catch (error) {
        return res.status(500).json({ menssagem: error.message });
    }
}

module.exports = {
    detalharProduto,
    excluirProduto
}