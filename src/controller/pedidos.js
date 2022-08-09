const knex = require('../config/conexao');

const { schemaCadastrarPedido, schemaValidarArray } = require('../validations/schemaPedidos')

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body

    try {
        await schemaCadastrarPedido.validate(req.body);

        for (const item of pedido_produtos) {
            await schemaValidarArray.validate(item);
        }

        const clienteExiste = await knex('clientes').where({ id: cliente_id }).first();

        if (!clienteExiste) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' });
        }

        const produtoExiste = await knex('produtos');

        let produtosNaoEncontrados = [];
        let produtosEncontrados = [];
        let produtosSemEstoque = [];
        let valorTotal = 0;

        // BLOCO PARA ENCONTRAR PRODUTOS

        for (const itemPedido of pedido_produtos) {

            const produto = await knex('produtos').where({ id: itemPedido.produto_id }).first();

            if (!produto) {
                produtosNaoEncontrados.push(itemPedido);
            } else if (itemPedido.quantidade_produto > produto.quantidade_estoque) {
                produtosSemEstoque.push(itemPedido);
            } else {
                produtosEncontrados.push(itemPedido);
                valorTotal += produto.valor * itemPedido.quantidade_produto
            }
        }

        return res.json(valorTotal);

        if (produtosNaoEncontrados.length == 0 && produtosSemEstoque.length === 0) {

            for (const itemPedido of produtosEncontrados) {
                const produto = await knex('produtos').where({ id: itemPedido.produto_id }).first();

                let retirarEstoque = produto.quantidade_estoque - itemPedido.quantidade_produto;

                await knex('produtos')
                    .update({ quantidade_estoque: retirarEstoque })
                    .where({ id: itemPedido.produto_id })

                const cadastrarPedido = await knex('pedidos')
                    .insert({ cliente_id, observacao })
                    .returning('*');

                const encontrarPedido = await knex('pedidos')
                    .where({ id: cliente_id }).first();

                await knex('pedido_produtos')
                    .insert({
                        pedido_id: encontrarPedido.id,
                        produto_id: itemPedido.produto_id,
                        quantidade_produto: itemPedido.quantidade_produto,
                        valor_produto: findById.valor
                    });

            }

            return res.status(200).json({ mensagem: "Pedido cadastrado" });

        } else {
            return res.status(404).json({
                "mensagem": "Os Produtos a seguir não foram encontrados",
                "Produtos não encontrados": produtosNaoEncontrados
            });
        }
    } catch (error) {
        return
    }
}

const listarPedidos = async (req, res) => {

}

module.exports = {
    cadastrarPedido,
    listarPedidos
}