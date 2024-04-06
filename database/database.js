const sequelize = require('sequelize');

const connection = new sequelize(
    'mundoVerde',
    'sys',
    'mundoVerde@2024',
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: '-03:00'
    }
);

module.exports = connection;