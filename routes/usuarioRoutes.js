const Express = require('express');
const router = Express.Router();

const UsuarioController = require('../controllers/UsuarioController');
//const checkLogin = require('../middleware/checkLogin');

router.get('/login', UsuarioController.renderLogin);
router.post('/login', UsuarioController.login);
router.get('/', UsuarioController.getAll);
router.get('/cadastrar', UsuarioController.renderNovo);
router.post('/', UsuarioController.create);
router.get('/:id', UsuarioController.renderEditar);
router.post('/salvar', UsuarioController.update);
router.get('/delete/:id', UsuarioController.delete);

module.exports = router;