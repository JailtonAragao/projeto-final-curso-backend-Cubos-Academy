const nodemailer = require('nodemailer');
require('dotenv').config();

const transportador = nodemailer.createTransport({
    host: process.env.MG_HOST,
    port: process.env.MG_PORT,
    auth: {
        user: process.env.MG_USER, // generated ethereal user
        pass: process.env.MG_PASS, // generated ethereal password
    },
});

module.exports = transportador;  
