const knex = require('../config/conexao');

const { schemaCadastrarPedido, schemaValidarArray } = require('../validations/schemaPedidos')

const cadastrarPedido = async (req, res) => {

}

const listarPedidos = async (req, res) => {
    const { cliente_id } = req.query

    try {

        let listarTodos;

        if (!cliente_id) {
            listarTodos = await knex('pedidos');

        }

        module.exports = {
            cadastrarPedido,
            listarPedidos
        }