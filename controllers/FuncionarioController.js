const Express = require('express');
const Funcionario = require("../models/funcionarios");
const Bcrypt = require("bcryptjs");


exports.renderDashboard = (req, res, next) => {
    res.render("./funcionario/dashboard");
}

exports.renderLogin = (req, res, next) => {
    res.render("./funcionarios/login", {msg: ''});
}

exports.renderNovo = (req, res, next) => {
    res.render("./funcionarios/novo");
}

exports.login = (req, res, next) => {
    const numeroPessoal = req.body.numeroPessoal;
    const senha = req.body.senha;

    Funcionario.findOne({
        where: {
            numeroPessoal: numeroPessoal
        }
    }).then(funcionario => {
        if(funcionario != undefined)
        {
            const confirmarSenha = Bcrypt.compareSync(senha, funcionario.senha);
            if(confirmarSenha)
            {
                req.session.login = {
                    numeroPessoal: funcionario.numeroPessoal
                }

                res.redirect("./funcionarios/dashboard");
            }
            else
            {
                res.render("./funcionarios/login", {msg: "Numero ou Senha Invalidos"});
            }
        }
        else
        {
            res.render("./funcionarios/login", {msg: "Numero ou Senha Invalidos"});
        }
    })
}

exports.novo = (req, res, next) => {
    const nome = req.body.nome;
    const senha = req.body.senha;

    Funcionario.findOne({
        where: {
            nome: nome
        }
    }).then(funcionario => {
        if(funcionario == undefined)
        {
            Funcionario.findOne({
                order: [['createdAt', 'DESC']]
            }).then(ultimoFuncionario => {
                const salt = Bcrypt.genSaltSync();
                const senhaCriptografada = Bcrypt.hashSync(senha, salt);
                const numeroPessoal = ultimoFuncionario.numeroPessoal + 1

                Funcionario.create({
                    numeroPessoal: numeroPessoal,
                    nome: nome,
                    senha: senhaCriptografada
                }).then(() => {
                    res.redirect('./funcionarios/NovoNumero', {np: numeroPessoal});
                });
            });
        }
        else
        {
            res.redirect('./funcionarios/dashboard');
        }
    });
}