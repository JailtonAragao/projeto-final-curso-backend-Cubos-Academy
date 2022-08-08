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
                produtosEncontrados.push(itemPedido);
            }       
        }

        console.log(produtosEncontrados)
        
        if (produtosNaoEncontrados.length == 0) {

            for (const itemPedido of produtosEncontrados) {
                const findById = produtoExiste.find((produto) => {
                    return produto.id == itemPedido.produto_id && produto.quantidade_estoque >= itemPedido.quantidade_produto
                });    
                
                if (!findById) {
                    return res.status(404).json({ mensagem: "Não temos estoque desse produto"});
                } else {
                    let retirarEstoque = findById.quantidade_estoque - itemPedido.quantidade_produto;
                    
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

            }
            
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