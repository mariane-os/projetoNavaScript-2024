const Express = require('express');
const router = Express.Router();

const Funcionario = require('../controllers/FuncionarioController');
const checkLogin = require('../middleware/checkFuncionario');

router.get('/login', Funcionario.renderLogin);
router.post('/login', Funcionario.login);
router.get('/dashboard', checkLogin, Funcionario.renderDashboard);
router.get('/novo', checkLogin, Funcionario.renderNovo);
router.post('/novo', checkLogin, Funcionario.novo);
router.get('/editar', checkLogin, Funcionario.renderEditar);

module.exports = router