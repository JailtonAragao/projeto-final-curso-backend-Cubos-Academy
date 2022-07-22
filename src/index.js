const express = require('express');

const categoria = require('./routes/categorias');
const login = require('./routes/login');
const usuario = require('./routes/usuarios');

const app = express();

app.use(express.json());

app.use('/categoria', categoria);
app.use('/login', login);
app.use('/usuario', usuario);


app.listen(3000, () => {
    console.log("Servidor rodando na porta http://localhost:3000");
});