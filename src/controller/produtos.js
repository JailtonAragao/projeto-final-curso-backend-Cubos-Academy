const knex = require('../config/conexao');

const { schemaCadastrarProduto, schemaEditarProduto } = require('../validations/schemaProdutos');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {

        await schemaCadastrarProduto.validate(req.body);

        const descricaoExiste = await knex('produtos').where({ descricao }).first();

        if (descricaoExiste) {
            return res.status(404).json({ mensagem: 'Já existe produto cadastrado com essa descrição.' })
        }

        const categoriaExiste = await knex('categorias').where({ id: categoria_id }).first();

        if (!categoriaExiste) {
            return res.status(404).json({ mensagem: 'A categoria informada não existe em nosso banco de dados.' })
        }

        const cadastrarProduto = await knex('produtos')
            .insert({ descricao, quantidade_estoque, valor, categoria_id })
            .returning('*');

        if (!cadastrarProduto) {
            return res.status(404).json({ mensagem: 'Produto não foi cadastrado' });
        }

        return res.status(201).json({ mensagem: 'Produto cadastrado com sucesso' });

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const editarProduto = async (req, res) => {
    const { id } = req.params;

    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {

        await schemaEditarProduto.validate(req.body);

        const produtoExiste = await knex('produtos').where({ id }).first();

        if (!produtoExiste) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' })
        }

        const categoriaExiste = await knex('categorias').where({ id: categoria_id }).first();

        if (!categoriaExiste) {
            return res.status(404).json({ mensagem: 'A categoria informada não existe em nosso banco de dados.' })
        }

        const editarProduto = await knex('produtos')
            .update({ descricao, quantidade_estoque, valor, categoria_id })
            .where({ id });

        if (!editarProduto) {
            return res.status(404).json({ mensagem: 'Produto não foi atualizado' });
        }

        return res.status(201).json({ mensagem: 'Produto atualizado com sucesso' });

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const listarProduto = async (req, res) => {

    const { categoria_id } = req.query

    try {

        if (!categoria_id) {
            const listarTodos = await knex('produtos');
            return res.status(200).json(listarTodos);
        } else {
            const categoriaProdutoExiste = await knex('produtos').where({ categoria_id }).first();

            if (!categoriaProdutoExiste) {
                return res.status(404).json({ mensagem: 'Não existe produtos cadastrados com a categoria_id informada.' });
            }
            return res.status(200).json(categoriaProdutoExiste);
        }
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const detalharProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoExiste = await knex('produtos').where({ id }).first();

        if (!produtoExiste) {
            return res.status(404).json({ mensagem: "O produto não existe em nosso banco de dados." });
        }

        return res.status(200).json(produtoExiste);

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const excluirProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoExiste = await knex('produtos').where({ id }).first();

        if (!produtoExiste) {
            return res.status(404).json({ mensagem: "O produto não existe em nosso banco de dados." });
        }

        const deletarProduto = await knex('produtos').where({ id }).del();

        if (!deletarProduto) {
            return res.status(404).json({ mensagem: "O produto não foi excluido" });
        }

        return res.status(200).json({ mensagem: "Produto excluido com sucesso" });

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    cadastrarProduto,
    editarProduto,
    listarProduto,
    detalharProduto,
    excluirProduto
}
