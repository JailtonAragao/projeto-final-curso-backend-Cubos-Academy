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
        
        // BLOCO PARA ENCONTRAR PRODUTOS
        
        for (const itemPedido of pedido_produtos) {
            const findById = produtoExiste.find((produto) => {
                return produto.id == itemPedido.produto_id
            });

            if (!findById) {
                produtosNaoEncontrados.push(itemPedido);
            } else {
                produtosEncontrados.push(findById);
            }       
        }

        // BLOCO PARA COMEÇAR INSERT
        
        if (produtosNaoEncontrados.length == 0) {
            
            const cadastrarPedido = await knex('pedidos')
            .insert({ cliente_id, observacao }).returning('*');
            
            return res.status(200).json({ mensagem: "Pedido cadastrado"});
        } else {
            return res.status(404).json({
                "mensagem": "Os Produtos a seguir não foram encontrados",
                "Produtos não encontrados": produtosNaoEncontrados
            });
        }      
        
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const listarPedidos = async (req, res) => {
    const { cliente_id } = req.query;


}

module.exports = {
    cadastrarPedido,
    listarPedidos
}