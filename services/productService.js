const Product = require('../models/productModel');
const factory = require('./handlerFactory');

// Get all products
exports.getProducts = factory.getAll(Product, 'products');

// get especific product
exports.getProduct = factory.getOne(Product);

// Creat Category
exports.createProduct = factory.createOne(Product);

// Update specefic product

exports.UpdateProduct = factory.updateOne(Product);
// Deleate A specific product

exports.deleteProduct = factory.deleteOne(Product);
