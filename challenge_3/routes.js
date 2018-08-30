const router = require('express').Router();
const controller = require('./controller');

router.get('/forms', controller.get);

router.post('/forms/account', controller.account.post);
router.post('/forms/shipping', controller.shipping.post);
router.post('/forms/billing', controller.billing.post);

module.exports = router;