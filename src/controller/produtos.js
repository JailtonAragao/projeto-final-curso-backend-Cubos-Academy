const knex = require('../config/conexao');

const schemaCadastrarProduto = require('../validations/schemaCadastrarProduto');
const schemaEditarProduto = require('../validations/schemaEditarProduto');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {

        await schemaCadastrarProduto.validate(req.body);

        const descricaoExiste = await knex('produtos').where({ descricao }).first();

        if (descricaoExiste) {
            return res.status(404).json({ menssagem: 'O produto produto já cadastrado.' })
        }

        const categoriaExiste = await knex('produtos').where({ categoria_id }).first();

        if (!categoriaExiste) {
            return res.status(404).json({ menssagem: 'Categoria cadastrada não existe.' })
        }

        
        const cadastrarProduto = await knex('produtos')
            .insert({ descricao, quantidade_estoque, valor, categoria_id })
            .returning('*');

            if (!cadastrarProduto) {
                return res.status(404).json({ menssagem: 'Produto não foi cadastrado' });
            }    

            return res.status(201).json({ menssagem: 'Produto cadastrado com sucesso' });
        
    } catch (error) {
        return res.status(500).json({ menssagem: error.message });  
    }

}

const editarProduto = async (req, res) => {
    const { id } = req.params;

    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {

        await schemaEditarProduto.validate(req.body);

        const descricaoExiste = await knex('produtos').where({ descricao }).first();

        if (descricaoExiste) {
            return res.status(404).json({ menssagem: 'O produto produto já cadastrado.' })
        }

        const categoriaExiste = await knex('produtos').where({ categoria_id }).first();

        if (!categoriaExiste) {
            return res.status(404).json({ menssagem: 'Categoria cadastrada não existe.' })
        }

        
        const editarProduto = await knex('produtos')
            .update({ descricao, quantidade_estoque, valor, categoria_id })
            .where({id});
            

            if (!editarProduto) {
                return res.status(404).json({ menssagem: 'Produto não foi atualizado' });
            }    

            return res.status(201).json({ menssagem: 'Produto atualizado com sucesso' });
        
    } catch (error) {
        return res.status(500).json({ menssagem: error.message });  
    }
}

const listarProduto = async (req, res) => {
    const {categoria_id} = req.params;

    const categoriaExiste = await knex('produtos').where({ categoria_id }).first();

        if (!categoriaExiste) {
            return res.status(404).json({ menssagem: 'Categoria solicitada não existe.' })
        }


    try {
        const produtos = await knex('produtos').where({ categoria_id });
        return res.status(200).json(produtos);

    } catch (error) {
        return res.status(500).json({ menssagem: error.message });
    }
}

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
    cadastrarProduto,
    editarProduto,
    listarProduto,
    detalharProduto,
    excluirProduto
}