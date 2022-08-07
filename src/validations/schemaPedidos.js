const yup = require('./configuracoes');

const schemaCadastrarPedido = yup.object().shape({
    cliente_id: yup.number().required('O cliente_id é obrigatório'),
    observacao: yup.string('O campo observacao é obrigatórios'),
    pedido_produtos: yup.array().required().min(1)
});

const schemaValidarArray = yup.object().shape({
    produto_id: yup.number().required(),
    quantidade_produto: yup.number().required()
});

module.exports = {
    schemaCadastrarPedido,
    schemaValidarArray
};