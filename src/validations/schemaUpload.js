const yup = require('./configuracoes');

const schemaUpload = yup.object().shape({
    url_produto: yup.string().required('O campo url_produto é obrigatório'),
    imagem: yup.string().requered('O campo imagem é obrigatório'),
    id_produto: yup.number().required('O campo id_produto é obrigatório')

});

module.exports = {
    schemaUpload
};