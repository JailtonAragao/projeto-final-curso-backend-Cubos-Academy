const yup = require('./configuracoes');

const schemaEditarCliente = yup.object().shape({
    nome: yup.string().required('O campo nome é obrigatório'),
    email: yup.string().email().required('O campo email é obrigatório'),
    cpf: yup.string().required('O campo cpf é obrigatório').max(11)
});

module.exports = schemaEditarCliente;