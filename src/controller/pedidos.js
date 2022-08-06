const knex = require('../config/conexao');

const { schemaCadastrarPedido } = require('../validations/schemaPedidos')

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos, produto_id, quantidade_produto } = req.body

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

        for (const itemPedido of pedido_produtos) {
            for (const itemProduto of produtoExiste) {
                if (itemPedido.produto_id === itemProduto.id) {
                    console.log(itemPedido);
                    break;
                } else {
                    console.log(itemPedido);
                    return res.status(500).json({ mensagem: `O Produto de id ${itemPedido.produto_id} não existe` });
                }
            }
        }

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }

}

const listarPedidos = async (req, res) => {

}

module.exports = {
    cadastrarPedido,
    listarPedidos
}