function checkLogin(req, res, next){
    if(req.session.login != undefined){
        if(req.session.login.id == undefined){
            res.redirect('/usuarios/login');
        }else{
            next();
        }
    }
    else{
        res.redirect('/usuarios/login');
    }
}

module.exports = checkLogin;