const Express = require('express');
const router = Express.Router();

const Funcionario = require('../controllers/FuncionarioController');
const Lixo = require('../controllers/LixoController')
const checkLogin = require('../middleware/checkFuncionario');

router.get('/login', Funcionario.renderLogin);
router.post('/login', Funcionario.login);
router.get('/dashboard', checkLogin, Funcionario.renderDashboard);
router.get('/novo', checkLogin, Funcionario.renderNovo);
router.post('/novo', checkLogin, Funcionario.novo);
router.get('/editar', checkLogin, Funcionario.renderEditar);
router.get('/criar', checkLogin, Lixo.renderAdicionar);
router.post('/criar', checkLogin, Lixo.adicionarLixo);


module.exports = router