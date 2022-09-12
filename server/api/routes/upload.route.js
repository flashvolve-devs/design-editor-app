const ImageController = require('../controllers/upload.controller');
const router = require('express').Router();

router.post('/', ImageController.createImage);

module.exports = router;