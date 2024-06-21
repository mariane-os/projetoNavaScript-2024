const Express = require('express');
const router = Express.Router();

const Funcionario = require('../controllers/FuncionarioController');
const Lixo = require('../controllers/LixoController')
const checkLogin = require('../middleware/checkFuncionario');

router.get('/login', Funcionario.renderLogin);
router.post('/login', Funcionario.login);
router.get('/esqueci', Funcionario.renderEsqueceuNP);
router.post('/esqueci', Funcionario.EsqueceuNP);
router.get('/dashboard', checkLogin, Funcionario.renderDashboard);
router.get('/novo', checkLogin, Funcionario.renderNovo);
router.post('/novo', checkLogin, Funcionario.novo);
router.get('/editar', checkLogin, Funcionario.renderEditar);
router.post('/editar', checkLogin, Funcionario.editar);
router.get('/criar', checkLogin, Lixo.renderAdicionar);
router.post('/criar', checkLogin, Lixo.adicionarLixo);

//router.get('/teste', checkLogin, Funcionario.renderTesteNovo);

module.exports = router;