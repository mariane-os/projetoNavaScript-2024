const Express = require('express');
const router = Express.Router();

const UsuarioController = require('../controllers/UsuarioController');
const LixoController = require('../controllers/LixoController');
const checkLogin = require('../middleware/checkUser');

router.get('/login', UsuarioController.renderLogin);
router.post('/login', UsuarioController.login);
router.get('/cadastrar', UsuarioController.renderNovo);
router.post('/cadastrar', UsuarioController.create);
router.get('/editar', checkLogin, UsuarioController.renderEditar);
router.post('/salvar', checkLogin, UsuarioController.update);
router.get('/delete', checkLogin, UsuarioController.renderDelete);
router.post('/delete', checkLogin, UsuarioController.delete)
router.get('/', checkLogin, UsuarioController.renderDashboard);
router.get('/movimentacoes', checkLogin, LixoController.renderMovimentacao);

module.exports = router;