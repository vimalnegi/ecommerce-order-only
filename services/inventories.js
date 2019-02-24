var Inventory = require('../models/inventory');


function isAvailable(productId, count) {
	return Inventory.findOne({
		_id: productId
	})
		.then(inventory => {
			console.log(inventory)
			if (!inventory) {
				return false
			}
			console.log(inventory.countRemaining)
			console.log(count)
		if (inventory.countRemaining >= count) {
			return true;
		}
		return false;
	})
}

function productSold(productId, count) {
	return Inventory.findOne({
		_id: productId
	}).then(product => {
		product.countRemaining = product.countRemaining - count;
		if (product.countRemaining < 0) {
			return Promise.reject({
				invalidProductCount: true
			})
		}
		return Inventory.updateOne({
			_id: productId
		}, {
				$set: {
					countRemaining: product.countRemaining
			}
		})
	})
}

function productsSold(productsWithCount) {
	soldPromises = Object.keys(productsWithCount).map(productId => {
		return productSold(productId, productsWithCount[productId])
	})
	return Promise.all(soldPromises)
}

function getProduct(productId) {
	return Inventory.find({
		_id: productId
	})
}

module.exports = {
	isAvailable,
	getProduct,
	productSold,
	productsSold,
}