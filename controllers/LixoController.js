const Express = require('express');
const Lixo = require("../models/Lixos");
const Usuario = require('../models/usuario');
const Funcionario = require('../models/funcionarios');
const {calcularValor, DataParaBanco} = require('../utils/conversao');
const DATA = require('../utils/conversao');
const connection = require('../database/database');
const { QueryTypes } = require('sequelize');

exports.renderAdicionar = (req, res, next) => {
    res.render('./lixo/adicionarLixo', {msg: ''});
}

exports.adicionarLixo = (req, res, next) => {
    const tipo = req.body.tipo;
    const peso = req.body.peso;
    const cpf = req.body.cpf;
    const valor = calcularValor(tipo, peso);
    
    Usuario.findOne({
        where: {
            cpf: cpf
        }
    }).then(user => {
        if(user != undefined){
            Funcionario.findOne({
                where: {
                    numeroPessoal: req.session.login.numeroPessoal
                }
            }).then(funcionario => {
                Lixo.create({
                    tipo: tipo,
                    peso: peso,
                    valor: valor,
                    usuarioId: user.id,
                    funcionarioId: funcionario.id
                }).then( () => {
                    Usuario.update({
                        saldo: user.saldo + valor
                    },
                    {
                        where: {
                            id: user.id
                        }
                    }).then( () => {
                        res.render('./lixo/adicionarLixo', {msg: 'Cadastrado Com Sucesso'});
                    })
                })
            })
        }else{
            res.render('Não existe usuário com esse cpf');
        }
    })
}

exports.renderMovimentacao = (req, res, next) => {
    connection.query('SELECT lixos.tipo, lixos.peso, lixos.valor, lixos.createdAt, funcionarios.nome FROM lixos INNER JOIN funcionarios ON lixos.funcionarioId = funcionarios.id WHERE usuarioId = ' + req.session.login.id, {
        type: QueryTypes.SELECT
    }).then( Lixos => {
        console.log(Lixos);
        res.render('./lixo/movimentacao', {lixos: Lixos})
    });
    /*Lixo.findAll({
        where: {
            usuarioId: req.session.login.id
        }
    }).then( lixos => {
        res.render('./lixo/movimentacao', {lixos: lixos, DataParaBanco: DATA});
    })*/
}