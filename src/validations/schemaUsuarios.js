const yup = require('./configuracoes');

const schemaCadastrarEditarUsuarios = yup.object().shape({
    nome: yup.string().required('O campo nome é obrigatório'),
    email: yup.string().email().required('O campo email é obrigatório'),
    senha: yup.string().required('O campo senha é obrigatório').min(4).max(12)
});

const schemaRedefinirSenha = yup.object().shape({
    email: yup.string().email().required('O campo email é obrigatório'),
    senha_antiga: yup.string().required('O campo senha_antiga é obrigatório').min(4).max(12),
    senha_nova: yup.string().required('O campo senha_nova é obrigatório').min(4).max(12)
});

module.exports = {
    schemaCadastrarEditarUsuarios,
    schemaRedefinirSenha
};