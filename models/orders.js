var db = require('../db')
var mongoose = db.mongoose
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderedProducts = new Schema({
	productId: ObjectId,
	productName: String,
	perProductCost: Number,
	count: Number,
})
const Order = new Schema({
	userName: String,
	products: [OrderedProducts],
	amountPaid: Number,
});


const OrderCollection = mongoose.model('order', Order);
module.exports = OrderCollection;