const yup = require('./configuracoes');

const schemaCadastrarPedido = yup.object().shape({
    cliente_id: yup.number().required('O cliente_id é obrigatório'),
    observacao: yup.string('O campo observacao é obrigatórios'),
    pedido_produtos: yup.string(), // verificar a melhor forma de validar uma Array
    produto_id: yup.number().required('O campo produto_id é obrigatório'),
    quantidade_produto: yup.number().required('O campo quantidade_produto é obrigatório e não pode ser menor que um').min(1)
});

module.exports = {
    schemaCadastrarPedido,
};