var router = require('express').Router();

router.use('/list', require('./list'));

module.exports = router;