const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/generate', require('./generate'));
router.use('/settings', require('./settings'));
router.use('/roles', require('./roles'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
