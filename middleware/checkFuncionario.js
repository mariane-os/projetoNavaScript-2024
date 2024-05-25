function checkLogin(req, res, next){
    if(req.session.login != undefined){
        if(req.session.login.numeroPessoal == undefined){
            res.redirect('/funcionarios/login');
        }else{
            next();
        }
    }
    else{
        res.redirect('/funcionarios/login');
    }
}

module.exports = checkLogin;