const router = require('express').Router();

router.get = (req, res) => {
  console.log('GET');
  res.send();
}

module.exports = router;