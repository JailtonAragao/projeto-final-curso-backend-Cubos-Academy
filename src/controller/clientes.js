const knex = require('../config/conexao');

const { schemaCadastrarClientes, schemaEditarClientes } = require('../validations/schemaClientes');

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        await schemaCadastrarClientes.validate(req.body);

        const emailExiste = await knex('clientes').where({ email }).first();

        if (emailExiste) {
            return res.status(404).json({ mensagem: 'O email informado já consta em nosso banco de dados' })
        }

        const cpfExiste = await knex('clientes').where({ cpf }).first();

        if (cpfExiste) {
            return res.status(404).json({ mensagem: 'O cpf informado já consta em nosso banco de dados' })
        }

        const inserirCliente = await knex('clientes')
            .insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
            .returning('*');

        if (!inserirCliente) {
            return res.status(404).json({ mensagem: 'O cliente não foi cadastrado' });
        }

        return res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso' });

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const editarCliente = async (req, res) => {
    const { id } = req.params;

    const { nome, email, cpf } = req.body;

    try {
        const clienteExiste = await knex('clientes').where({ id }).first();

        if (!clienteExiste) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' });
        }

        await schemaEditarClientes.validate(req.body);

        const emailExiste = await knex('clientes').where({ email }).first();

        const cpfExiste = await knex('clientes').where({ cpf }).first();

        if (!cpfExiste || cpfExiste.id == id) {

            if (!emailExiste || emailExiste.id == id) {

                const clienteAtualizado = await knex('clientes').update({ nome, email, cpf }).where({ id });

                if (!clienteAtualizado) {
                    return res.status(404).json({ mensagem: 'O cliente não foi atualizado' });
                }

                return res.status(200).json({ mensagem: "Cliente atualizado com Sucesso!" });

            } else {
                return res.status(404).json({ mensagem: 'O email informado já consta em nosso banco de dados' });
            }

        } else {
            return res.status(404).json({ mensagem: 'O cpf informado já consta em nosso banco de dados' });
        }

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const listarClientes = async (req, res) => {
    try {
        const clientes = await knex('clientes');
        return res.status(200).json(clientes);

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const detalharCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const clienteExiste = await knex('clientes').where({ id }).first();

        if (!clienteExiste) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' });
        }

        return res.status(200).json(clienteExiste);

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    cadastrarCliente,
    editarCliente,
    listarClientes,
    detalharCliente
}