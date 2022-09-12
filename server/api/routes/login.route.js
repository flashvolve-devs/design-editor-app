const router = require('express').Router();
const loginMiddleware = require('../middlewares/login.middleware');
const LoginController = require('../controllers/login.controller');

const loginController = new LoginController();

router.post('/', loginMiddleware, loginController.login);

router.get('/validate', loginController.validation);

module.exports = router;
