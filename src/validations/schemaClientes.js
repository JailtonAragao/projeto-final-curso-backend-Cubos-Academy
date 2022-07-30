const yup = require('./configuracoes');

const schemaClientes = yup.object().shape({
    nome: yup.string().required('O campo nome é obrigatório'),
    email: yup.string().email().required('O campo email é obrigatório'),
    cpf: yup.string().required('O campo cpf é obrigatório').max(11),
    cep: yup.string(),
    rua: yup.string(),
    numero: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
    estado: yup.string().max(2)
});

module.exports = schemaClientes;