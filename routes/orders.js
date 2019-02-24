var express = require('express');
var router = express.Router();
var Order = require('../services/orders')

/* GET orders listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* CREATE order. */
router.post('/', function (req, res, next) {
	var order = req.body;
	Order.create(order)
		.then(data => {
			res.send(data)
		})
		.catch(err => {
			console.log(err)
			res.status(500).send(err)
	})
  });

module.exports = router;
