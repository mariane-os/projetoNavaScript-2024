const Express = require('express');
const Funcionario = require("../models/funcionarios");
const Bcrypt = require("bcryptjs");


exports.renderDashboard = (req, res, next) => {
    res.render("./funcionario/dashboard");
}

exports.renderLogin = (req, res, next) => {
    res.render("./funcionario/login", {msg: ''});
}

exports.renderNovo = (req, res, next) => {
    res.render("./funcionario/cadastrar");
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

                res.redirect("dashboard");
            }
            else
            {
                res.render("./funcionario/login", {msg: "Numero ou Senha Invalidos"});
            }
        }
        else
        {
            res.render("./funcionario/login", {msg: "Numero ou Senha Invalidos"});
        }
    })
}

exports.novo = (req, res, next) => {
    const nome = req.body.nome
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

                let numeroP = 30100000;
                if(ultimoFuncionario != undefined){
                    numeroP = ultimoFuncionario.numeroPessoal + 1;
                }

                Funcionario.create({
                    numeroPessoal: numeroP,
                    nome: nome,
                    senha: senhaCriptografada
                }).then(() => {
                    res.render('./funcionario/NovoNumero', {np: numeroP});
                });
            });
        }
        else
        {
            res.redirect('dashboard');
        }
    });
}

exports.renderEditar = (req, res, next) => {
    Funcionario.findOne({
        where: {
            numeroPessoal: req.session.login.numeroPessoal
        }
    }).then(funcionario => {
        if(funcionario != undefined){
            res.render('./funcionario/editar', {funcionario: funcionario});
        }else{
            res.redirect('dashboard')
        }
    })
}