const express = require('express');

const categoria = require('./routes/categorias');
const login = require('./routes/login');
const usuario = require('./routes/usuarios');

const app = express();

const port = 8000;

app.use(express.json());

app.use(categoria);
app.use(login);
app.use(usuario);


app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});