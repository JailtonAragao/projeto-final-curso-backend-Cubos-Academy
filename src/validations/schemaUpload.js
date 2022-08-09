const yup = require('./configuracoes');

const schemaUpload = yup.object().shape({
    url_produto: yup.string().required('O campo url_produto é obrigatório'),
});

module.exports = {
    schemaUpload
};