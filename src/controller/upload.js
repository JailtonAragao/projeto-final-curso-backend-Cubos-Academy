const { supabase } = require('../config/supabase');

const { schemaUpload } = require('../validations/schemaUpload')

const uploadArquivos = async (req, res) => {
    const { url_produto } = req.body

    const buffer = Buffer.from(url_produto, 'base64');

    try {

        await schemaUpload.validate(req.body);

        const dia = new Date() + 1;
        const diaFormatado = String(dia) + 'jpg';

        console.log(dia);

        const { data, error } = await supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .upload(dia, buffer);

        if (error) {
            return res.status(500).json({ mensagem: error.message });
        }

        const { publicURL, error: errorPublicUrl } = supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .getPublicUrl(dia);

        if (errorPublicUrl) {
            return res.status(500).json({ mensagem: errorPublicUrl.message });
        }
        return res.status(201).json(publicURL);

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    uploadArquivos
}