const ImageController = require('../controllers/image.controller');
const express = require('express');
const router = express.Router();

router.get('/', ImageController.home);
router.post('/image', ImageController.createImage);

module.exports = router;