var express = require('express');
var router = express.Router();


var docs_controller = require('../controllers/docsController');

router.get('/', docs_controller.index);

router.post('/upload', docs_controller.upload);

module.exports = router;