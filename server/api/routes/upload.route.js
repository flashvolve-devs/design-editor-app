const UploadController = require('../controllers/upload.controller');
const router = require('express').Router();

router.post('/', UploadController.createImage);
router.post('/salvar', UploadController.template);
router.get('/', UploadController.upload);

module.exports = router;