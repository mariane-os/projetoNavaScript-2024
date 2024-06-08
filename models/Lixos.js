
const sequelize = require('sequelize');
const usuario = require('./usuario');
const connection = require('../database/database');

const Lixo = connection.define('lixos', {
    tipo: {
        type: sequelize.STRING,
        allowNull: false
    },
    peso: {
        type: sequelize.FLOAT,
        allowNull: false
    },
    valor: {
        type: sequelize.FLOAT,
        allowNull: false
    }
}
);

Lixo.belongsTo(usuario);

//Lixo.sync({force: true});

module.exports = Lixo;