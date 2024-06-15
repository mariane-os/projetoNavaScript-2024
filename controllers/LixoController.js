const Express = require('express');
const Lixo = require("../models/Lixos");
const Usuario = require('../models/usuario');
const {calcularValor, DataParaBanco} = require('../utils/conversao');
const DATA = require('../utils/conversao');

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
            Lixo.create({
                tipo: tipo,
                peso: peso,
                valor: valor,
                usuarioId: user.id
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
        }else{
            res.render('Não existe usuário com esse cpf');
        }
    })
}

exports.renderMovimentacao = (req, res, next) => {
    Lixo.findAll({
        where: {
            usuarioId: req.session.login.id
        }
    }).then( lixos => {
        res.render('./lixo/movimentacao', {lixos: lixos, DataParaBanco: DATA});
    })
}