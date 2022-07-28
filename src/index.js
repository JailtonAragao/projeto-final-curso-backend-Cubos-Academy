const express = require('express');
require('dotenv').config();

const categoria = require('./routes/categorias');
const login = require('./routes/login');
const usuario = require('./routes/usuarios');

const app = express();

app.use(express.json());

app.use('/categoria', categoria);
app.use('/login', login);
app.use('/usuario', usuario);

app.listen(process.env.PORT || 8000);