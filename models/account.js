var db = require('../db');

var mongoose = db.mongoose;
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Account = new Schema({
  userName: String,
});

const AccountCollection = mongoose.model('account', Account);
module.exports = AccountCollection;