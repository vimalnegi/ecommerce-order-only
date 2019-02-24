var Order = require('../models/orders');
var Inventory = require('../services/inventories')


function create(order) {
	productsAvailablePromise = order.products.map(product => {
		return Inventory.isAvailable(product.productId, product.count)
	})
	return Promise.all(productsAvailablePromise)
		.then(availabilities => {
			console.log(availabilities)
			const allAvailable = availabilities.reduce((acc, available) => acc && available, true);
			if (allAvailable) {
				//add cost to order from inventory collection
				return Order.create(order)
					.then(order => {
						const productCountMap = order.products.reduce((productCountMapping, product) => {
							productCountMapping[product.productId] = product.count
							return productCountMapping;
						}, {})
						return Inventory.productsSold(productCountMap);
					})
			} else {
				return Promise.reject({
					productUnavailablility: true
				})
			}
		})
}

module.exports = {
	create: create
}