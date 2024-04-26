const Express = require('express');
const router = Express.Router();

const Funcionario = require('../controllers/FuncionarioController');

router.get('/login', Funcionario.renderLogin);
router.post('/login', Funcionario.login);
router.get('/dashboard', Funcionario.renderDashboard);
router.get('/novo', Funcionario.renderNovo);
router.post('/novo', Funcionario.novo);

module.exports = router