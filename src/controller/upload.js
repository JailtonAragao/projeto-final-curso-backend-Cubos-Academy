const { supabase } = require('../config/supabase');
const knex = require('../config/conexao');

const { schemaUpload } = require('../validations/schemaUpload')

const uploadArquivos = async (req, res) => {
    const { imagem, id_produto, url_produto } = req.body

    const buffer = Buffer.from(url_produto, 'base64');

    try {

        await schemaUpload.validations(req.body);

        const { data, error } = await supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .upload(imagem, buffer);

        if (error) {
            return res.status(500).json({ mensagem: error.message });
        }

        const { publicURL, errorPublicUrl } = supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .getPublicUrl(imagem);

        if (errorPublicUrl) {
            return res.status(500).json({ mensagem: error.message });
        }

        const incluirImagemEmProdutos = await knex('produtos').insert({ produto_imagem: publicURL }).where({ id: id_produto });

        if (!incluirImagemEmProdutos) {
            return res.status(400).json('A imagem náo foi incluida no banco de dados');
        }

        return res.status(201).json('Upload da imagem efetuado com sucesso');

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    uploadArquivos
}