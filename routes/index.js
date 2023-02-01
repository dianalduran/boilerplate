const router = require('express').Router();

//to add routes here
router.use('/users', require('./users'));

//handling 404s
router.use(function(req, res, next) {
	const err = new Error('Not found.');
	err.status = 404;
	next(err);
});

module.exports = router;
