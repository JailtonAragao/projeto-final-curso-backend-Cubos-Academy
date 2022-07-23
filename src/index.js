const express = require('express');

const categoria = require('./routes/categorias');
const login = require('./routes/login');
const usuario = require('./routes/usuarios');

const app = express();

app.use(express.json());

app.use('/categoria', categoria);
app.use('/login', login);
app.use('/usuario', usuario);


app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});