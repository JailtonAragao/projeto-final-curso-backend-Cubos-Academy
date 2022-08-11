const express = require('express');
require('dotenv').config();

const categoria = require('./routes/categorias');
const login = require('./routes/login');
const usuario = require('./routes/usuarios');
const produto = require('./routes/produtos');
const cliente = require('./routes/clientes');
const upload = require('./routes/upload');
const pedido = require('./routes/pedidos');

const app = express();

app.use(express.json({ limit: '5mb' }));

app.use('/categoria', categoria);
app.use('/login', login);
app.use('/usuario', usuario);
app.use('/produto', produto);
app.use('/cliente', cliente);
app.use('/upload', upload);
app.use('/pedido', pedido);

app.listen(process.env.PORT || 3000);