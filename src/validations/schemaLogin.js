const yup = require('./configuracoes');

const schemaLogin = yup.object().shape({
    email: yup.string().email().required('O campo email é obrigatório'),
    senha: yup.string().required('O campo senha é obrigatório')
});

module.exports = schemaLogin;