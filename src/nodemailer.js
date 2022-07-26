const nodemailer = require('nodemailer');
require('dotenv').config();

const transportador = nodemailer.createTransport({
    host: process.env.MG_HOST,
    port: process.env.MG_PORT,
    //secure: process.env.MG_SECURE, // true for 465, false for other ports
    auth: {
        user: process.env.MG_USER, // generated ethereal user
        pass: process.env.MG_PASS, // generated ethereal password
    },
    //host:  ,
    //port: ,
    //auth: {
    // user:  ,
    // pass: ,
    // },
});

module.exports = transportador;  
