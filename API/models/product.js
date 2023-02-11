const mongoose = require('mongoose');

// Create a data schema for products in MongoDB
const productSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    // We store the price in its lowest currency value -> cents
    price: { type: Number, required: true },
    description: { type: String, required: true },
    __v: { type: Number, select: false },
});

// Create a model from the schema
module.exports = mongoose.model('Product', productSchema);
