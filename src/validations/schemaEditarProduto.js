const yup = require('./configuracoes');

const schemaEditarProdutos = yup.object().shape({
    descricao: yup.string().required('O descrição é obrigatório'),
    quantidade_estoque: yup.number().required('O campo quantidade_estoque é obrigatório'),
    valor: yup.number().required('O campo valor é obrigatório'),
    categoria_id: yup.number().required('O campo categoria_id é obrigatório')
});

module.exports = schemaEditarProdutos;