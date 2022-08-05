const knex = require('../config/conexao');

const { schemaCadastrarPedido } = require('../validations/schemaPedidos')

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos, produto_id, quantidade_produto } = req.body
    await schemaCadastrarPedido.validate(req.body);
    res.json(req.body);

}

const listarPedidos = async (req, res) => {

}

module.exports = {
    cadastrarPedido,
    listarPedidos
}