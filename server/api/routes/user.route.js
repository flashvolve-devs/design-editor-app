const router = require('express').Router();
const UserController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

const userController = new UserController();

router.get('/', userController.getAll);

router.get('/:id', userController.getById);

router.post('/', userMiddleware, userController.create);

router.patch('/:id', userMiddleware, userController.update);

router.delete('/:id', userController.delete);

module.exports = router;