const Express = require("express");
const Usuario = require("../models/usuario");
const bycrypt = require("bcryptjs");
const { Op, where } = require("sequelize");


exports.renderNovo = (req, res, next) => {
    res.render("./usuario/cadastrar");
}

exports.create = (req, res, next) => {
    const cpf = req.body.cpf;
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    console.log("Entrou no create");
    Usuario.findOne({
        where: {
            [Op.or]: [{email: email}, {cpf: cpf}],
        }
    }).then(usuario => {
        console.log("Entrou na arrow")
        if(usuario == undefined)
        {
            const salt = bycrypt.genSaltSync();
            const senhaCriptografada = bycrypt.hashSync(senha, salt);
            console.log("Entrou no undefined")
            Usuario.create({
                cpf: cpf,
                nome: nome,
                email: email,
                senha: senhaCriptografada,
                saldo: 0.00
            }).then(() => {
                console.log("Foi criado");
                res.redirect("login");
            });
            res.redirect("login");
        }
        else
        {
            res.redirect("cadastrar");
        }
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;
    Usuario.findByPk(id).then(usuario => {
        res.render("usuario/editar", {usuario:usuario});
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const email = req.body.email;
    
    Usuario.update({
        nome: nome,
        email: email
    },
    {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/usuarios");
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Usuario.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/usuarios');
    });
}

exports.renderLogin = (req, res, next) => {
    res.render('./usuario/login', {msg: ''});
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const senha = req.body.senha;

    Usuario.findOne({
        where: {
            email: email,
        }
    }).then(usuario => {
        console.log(usuario);
        if(usuario != undefined)
        {
            const confirmarSenha = bycrypt.compareSync(senha, usuario.senha);
            if(confirmarSenha)
            {
                /*
                req.session.login = {
                    nome: usuario.nome
                }*/

                res.redirect('/');
            }
            else
            {
                res.render('./usuario/login', {msg: 'Senha Invalidos'});
            }
        }
        else
        {
            res.render('./usuario/login', {msg: 'Usuário Invalidos'});
        }
    });
}