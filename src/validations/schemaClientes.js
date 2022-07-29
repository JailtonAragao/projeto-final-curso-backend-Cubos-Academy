const yup = require('./configuracoes');

const schemaClientes = yup.object().shape({
    nome: yup.string().required('O campo nome é obrigatório'),
    email: yup.string().email().required('O campo email é obrigatório'),
    cpf: yup.number().required('O campo cpf é obrigatório').max(11)
});

module.exports = schemaClientes;