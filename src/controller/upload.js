const { supabase } = require('../config/supabase');

const { schemaUpload } = require('../validations/schemaUpload')

const uploadArquivos = async (req, res) => {
    const { nome, url_produto } = req.body

    const buffer = Buffer.from(url_produto, 'base64');

    try {

        await schemaUpload.validations(req.body);

        // const dia = new Date();

        const { data, error } = await supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .upload(nome, buffer);

        if (error) {
            return res.status(500).json({ mensagem: error.message });
        }

        const { publicURL, error: errorPublicUrl } = supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .getPublicUrl(nome);

        if (errorPublicUrl) {
            return res.status(500).json({ mensagem: error.message });
        }
        return res.status(201).json(publicURL);

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    uploadArquivos
}