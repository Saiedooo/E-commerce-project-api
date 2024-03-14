const express = require('express');
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require('../utils/validators/productValidator');
const {
  getProduct,
  getProducts,
  createProduct,
  UpdateProduct,
  deleteProduct,
} = require('../services/productService');

const router = express.Router();

router.route('/').get(getProducts).post(createProductValidator, createProduct);
router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, UpdateProduct)
  .delete(deleteProductValidator, deleteProduct);
module.exports = router;
