var db = require('../db')
var mongoose = db.mongoose
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Inventory = new Schema({
	countRemaining: Number,
	description: String,
	price: Number,
	details: {
		name: String,
		description: String,
	}
});

const InventoryCollection = mongoose.model('inventory', Inventory);
module.exports = InventoryCollection;