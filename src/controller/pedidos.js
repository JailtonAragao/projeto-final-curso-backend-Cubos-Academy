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

        let produtosNaoEncontrados = [];
        let produtosEncontrados = [];
        let produtosSemEstoque = [];
        let valor_total = 0;

        for (const itemPedido of pedido_produtos) {

            const produto = await knex('produtos').where({ id: itemPedido.produto_id }).first();

            if (!produto) {
                produtosNaoEncontrados.push(itemPedido);
            } else if (itemPedido.quantidade_produto > produto.quantidade_estoque) {
                produtosSemEstoque.push(itemPedido);
            } else {
                produtosEncontrados.push(itemPedido);
                valor_total += produto.valor * itemPedido.quantidade_produto
            }
        }

        if (produtosNaoEncontrados.length == 0 && produtosSemEstoque.length === 0) {

            const cadastrarPedido = await knex('pedidos')
                .insert({ cliente_id, observacao, valor_total })
                .returning('*');

            for (const itemPedido of produtosEncontrados) {

                const produto = await knex('produtos').where({ id: itemPedido.produto_id }).first();

                let retirarEstoque = produto.quantidade_estoque - itemPedido.quantidade_produto;

                await knex('produtos')
                    .update({ quantidade_estoque: retirarEstoque })
                    .where({ id: itemPedido.produto_id })

                await knex('pedido_produtos')
                    .insert({
                        pedido_id: cadastrarPedido[0].id,
                        produto_id: produto.id,
                        quantidade_produto: itemPedido.quantidade_produto,
                        valor_produto: produto.valor
                    });
            }

            return res.status(200).json({ mensagem: "Pedido cadastrado" });

        } else {
            return res.status(404).json({
                mensagem: "Os Produtos a seguir não foram encontrados ou a quantidade de estoque é inválida",
                "Produtos não encontrados": produtosNaoEncontrados,
                "Produtos em estoque": produtosSemEstoque
            });
        }
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}


const listarPedidos = async (req, res) => {
    const { cliente_id } = req.query

    try {

        if (!cliente_id) {
            const listarTodos = await knex('pedidos')
                .join('pedido_produtos', 'pedidos.id', 'pedido_produtos.pedido_id')
                .select('pedido_produtos.')
            const pedidos = [];

            for (const item of listarTodos) {
                pedidos.push({
                    pedido: {
                        id: item.id,
                        valor_total: item.valor_total,
                        observacao: item.observacao,
                        cliente_id: item.cliente_id
                    },
                    pedido_produtos: [
                        {
                            id: item.id,
                            quantidade_produto: item.quantidade_produto,
                            valor_produto: item.valor_produto,
                            pedido_id: item.pedido_id,
                            produto_id: item.produto_id,
                        }
                    ]
                })
            }
            return res.status(200).json(pedidos)
        } else {
            const clienteExiste = await knex('pedidos').where({ cliente_id }).first();

            if (!clienteExiste) {
                return res.status(404).json({ mensagem: 'Não existe produtos cadastrados com o cliente_id informado.' });
            }
            const listarPedidosCliente = await knex('pedidos')
                .join('pedido_produtos', 'pedidos.id', 'pedido_produtos.pedido_id')
                .where({ cliente_id })

            const pedidosCliente = [];

            for (const item of listarPedidosCliente) {
                return res.status(200).json(

                    pedidosCliente.push({
                        pedido: {
                            id: item.id,
                            valor_total: item.valor_total,
                            observacao: item.observacao,
                            cliente_id: item.cliente_id
                        },
                        pedido_produtos: [
                            {
                                id: item.produtos_id,
                                quantidade_produto: item.quantidade_produto,
                                valor_produto: item.valor_produto,
                                pedido_id: item.pedido_id,
                                produto_id: item.produto_id
                            }
                        ]
                    })
                )
            }
            return res.status(200).json(pedidosCliente)
        }
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    cadastrarPedido,
    listarPedidos
}