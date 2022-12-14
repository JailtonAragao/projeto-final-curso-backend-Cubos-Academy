const yup = require('./configuracoes');

const schemaCadastrarProdutos = yup.object().shape({
    descricao: yup.string().required('O descrição é obrigatório'),
    quantidade_estoque: yup.number().required('O campo quantidade_estoque é obrigatório e tem que ter pelo menos 1 item').min(1),
    valor: yup.number().required('O campo valor é obrigatório e não pode ser negativo').min(0),
    categoria_id: yup.number().required('O campo categoria_id é obrigatório'),
    produto_imagem: yup.string()
});

const schemaEditarProdutos = yup.object().shape({
    descricao: yup.string().required('O descrição é obrigatório'),
    quantidade_estoque: yup.number().required('O campo quantidade_estoque é obrigatório e tem que ter pelo menos 1 item').min(1),
    valor: yup.number().required('O campo valor é obrigatório e não pode ser negativo').min(0),
    categoria_id: yup.number().required('O campo categoria_id é obrigatório'),
    produto_imagem: yup.string().nullable()
});

module.exports = {
    schemaCadastrarProdutos,
    schemaEditarProdutos
};