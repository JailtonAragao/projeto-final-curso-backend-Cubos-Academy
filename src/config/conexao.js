require('dotenv').config();

const knex = require('knex')({
    client: 'pg',
    connection: {
        user: 'postgres',
        host: 'localhost',
        database: 'pdv',
        password: '8785',
        port: '5432'
        // user: process.env.DB_USER,
        // host: process.env.DB_HOST,
        // database: process.env.DB_DATABASE,
        // password: process.env.DB_PASSWORD,
        // port: process.env.DB_PORT,
        // ssl: {
        //     rejectUnauthorized: false,
        // }
    }
});

module.exports = knex;