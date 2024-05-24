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
        }
        else
        {
            res.redirect("cadastrar");
        }
    });
}

exports.renderEditar = (req, res, next) => {
    Usuario.findByPk(req.session.login.id).then(usuario => {
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
    Usuario.findByPk(req.session.login.id).then(usuario => {
        if(usuario.cpf == req.body.cpf){
            Usuario.destroy({
                where: {
                    id: req.session.login.id
                }
            }).then(() => {
                res.redirect('login');
            });
        }else{
            res.render('./usuario/delete', {msg: 'CPF ERRADO'})
        }
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
                
                req.session.login = { id: usuario.id}

                res.redirect('/usuarios/');
            }
            else
            {
                res.render('./usuario/login', {msg: 'Usuário ou Senha Invalidos'});
            }
        }
        else
        {
            res.render('./usuario/login', {msg: 'Usuário ou Senha Invalidos'});
        }
    });
}

exports.renderDashboard = (req, res, next) => {
    console.log(req.session.login.id);
    res.render("./usuario/index");
}

exports.renderDelete = (req, res, next) => {
    res.render('./usuario/delete', {msg: ''})
}