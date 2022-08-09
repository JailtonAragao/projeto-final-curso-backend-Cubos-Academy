const { supabase } = require('../config/supabase');

const { schemaUpload } = require('../validations/schemaUpload')

const uploadArquivos = async (req, res) => {
    const { url_produto } = req.body

    const buffer = Buffer.from(url_produto, 'base64');

    try {

        await schemaUpload.validations(req.body);

        const { data, error } = await supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .upload(new Date(), buffer);

        if (error) {
            return res.status(500).json({ mensagem: error.message });
        }

        const { publicURL, errorPublicUrl } = supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .getPublicUrl(new Date());

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