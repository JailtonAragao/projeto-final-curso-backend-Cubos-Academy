const knex = require('../config/conexao');
const schemaClientes = require('../validations/schemaClientes');

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        await schemaClientes.validate(req.body);

        const emailExiste = await knex('clientes').where({ email }).first();

        if (emailExiste) {
            return res.status(404).json({ menssagem: 'O email informado já consta em nosso banco de dados' })
        }

        const cpfExiste = await knex('clientes').where({ cpf }).first();

        if (cpfExiste) {
            return res.status(404).json({ menssagem: 'O cpf informado já consta em nosso banco de dados' })
        }

        const inserirCliente = await knex('clientes')
            .insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
            .returning('*');

        if (!inserirCliente) {
            return res.status(404).json({ menssagem: 'O cliente não foi cadastrado' });
        }

        return res.status(201).json({ menssagem: 'Usuário cadastrado com sucesso' });

    } catch (error) {
        return res.status(500).json({ menssagem: error.message });
    }
}

module.exports = {
    cadastrarCliente
}