const ImageController = require('../controllers/image.controller');
const router = require('express').Router();

router.get('/', ImageController.home);
router.post('/image', ImageController.createImage);

module.exports = router;