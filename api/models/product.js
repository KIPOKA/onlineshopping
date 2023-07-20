const mongoose = require('mongoose');

//create a schema
const ProductSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    price: Number,
    description: String
});

module.exports = mongoose.model('Product', ProductSchema);
