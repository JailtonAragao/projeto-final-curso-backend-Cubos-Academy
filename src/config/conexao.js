require('dotenv').config();

const knex = require('knex')({
    client: 'pg',
    connection: {
        // user: process.env.DB_USER,
        // host: process.env.DB_HOST,
        // database: process.env.DB_DATABASE,
        // password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        user: 'sfnbyyociqqyns',
        host: 'ec2-54-87-179-4.compute-1.amazonaws.com',
        database: 'd93klr463f6iiq',
        password: 'da520350f1793b55b18e9c9c4dced9820f977a637818540aa60f3ebcf4fe5aa7',
        port: 5432,
        ssl: {
            rejectUnauthorized: false,
        }
    }
});

module.exports = knex;