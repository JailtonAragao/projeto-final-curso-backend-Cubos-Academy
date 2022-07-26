const nodemailer = require('nodemailer');
require('dotenv').config();

const transportador = nodemailer.createTransport({
    host: process.env.MG_HOST,
    port: process.env.DB_PORT,
    secure: process.env.DB_SECURE, // true for 465, false for other ports
    auth: {
        user: process.env.DB_USER, // generated ethereal user
        pass: process.env.DB_PASS, // generated ethereal password
    },
});

module.exports = transportador;  