require('dotenv').config();

const knex = require('knex')({
    client: 'pg',
    connection: {
        user: 'postgres',
        host: 'localhost',
        database: 'pdv',
        password: 'apollo21',
        port: 5432,
    }
});

module.exports = knex;