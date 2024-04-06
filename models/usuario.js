const sequelize = require('sequelize');
const connection = require('../database/database');

const Usuario = connection.define('usuarios', {
    cpf: {
        type: sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: sequelize.STRING,
        allowNull: false,
    },
    saldo: {
        type: sequelize.DOUBLE,
        allowNull: false
    }
}
);

//Usuario.sync({force: true});

module.exports = Usuario;