const sequelize = require('sequelize');
const connection = require('../database/database');

const Funcionario = connection.define('funcionarios', {
    numeroPessoal: {
        type: sequelize.BIGINT,
        allowNull: false,
    },
    nome: {
        type: sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: sequelize.STRING,
        allowNull: false,
    },
}
);

//Funcionario.sync({force: true});

module.exports = Funcionario;