const knex = require('../config/conexao');
const schemaEditarCliente = require('../validations/schemaEditarCliente');

const editarCliente = async (req, res) => {
    const { id } = req.params;

    const { nome, email, cpf } = req.body;

    try {
        await schemaEditarCliente.validate(req.body);
        
        const clienteExiste = await knex('clientes').where({ id }).first();

        const emailExiste = await knex('usuarios').where({ email }).first();

        if(!clienteExiste) {
            return res.status(404).json({ 'mensagem': 'Cliente não encontrado' });
        }

        if (emailExiste.id !== id) {
            return res.status(404).json({ 'mensagem': 'O email informado já consta em nosso banco de dados' });

        } else {
            const clienteAtualizado = await knex('clientes').update({ nome, email, cpf }).where('id', id);

            if (!clienteAtualizado) {
                return res.status(404).json({ 'mensagem': 'O cliente não foi atualizado' });
            }

            return res.status(200).json({ 'mensagem': "Cliente atualizado com Sucesso!" });
        }

    } catch (error) {
        return res.status(500).json({ 'mensagem': error.message });
    }

}

const listarClientes = async (req, res) => {
    try {
        const clientes = await knex('clientes');
        return res.status(200).json(clientes);

    } catch (error) {
        return res.status(500).json({ 'mensagem': error.message });
    }
}

const detalharCliente = async (req, res) => {
    const { id } = req.params;
    
    try {
        const clienteExiste = await knex('clientes').where({ id }).first();

        if(!clienteExiste) {
            return res.status(404).json({ 'mensagem': 'Cliente não encontrado' });
        }

        return res.status(200).json(clienteExiste);

    } catch (error) {
        return res.status(500).json({ 'mensagem': error.message });
    }
}

module.exports = {
    editarCliente,
    listarClientes,
    detalharCliente
}
