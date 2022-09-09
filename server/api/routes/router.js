const MainController = require('../controllers/image.controller');
const UploadController = require('../controllers/upload.controller');
const upload = require('../middlewares/configMulter');
const express = require('express');
const router = express.Router();

router.get('/home', MainController.home);
router.get('/', UploadController.uploadPage);
router.post('/image', MainController.createImage);
router.post('/upload', UploadController.upload);
router.get('/upload', UploadController.uploadPage);
router.post('/template', UploadController.template);

module.exports = router;