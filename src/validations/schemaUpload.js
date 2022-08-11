const yup = require('./configuracoes');

const schemaUpload = yup.object().shape({
    imagem: yup.string().required('O campo url_produto é obrigatório'),
});

module.exports = {
    schemaUpload
};