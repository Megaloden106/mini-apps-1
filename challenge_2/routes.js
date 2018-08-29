const controller = require('./controller');
const router = require('express').Router();

router.post('/data', controller.post);

router.get('/data', controller.get);

module.exports = router;