const MainController = require('../controllers/image.controller');
const upload = require('../middlewares/configMulter');
const express = require('express');
const router = express.Router();

router.get('/', MainController.home);
router.post('/image', MainController.createImage);

module.exports = router;