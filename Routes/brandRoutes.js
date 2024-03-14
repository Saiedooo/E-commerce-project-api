const express = require('express');
const {
  getBrandValidator,
  createBrandValidator,
  UpdateBrandValidator,
  deleteBrandValidator,
} = require('../utils/validators/brandValidator');
const {
  getBrands,
  getBrand,
  createBrand,
  UpdateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require('../services/brandService');

const router = express.Router();
router
  .route('/')
  .get(getBrands)
  .post(uploadBrandImage, resizeImage, createBrandValidator, createBrand);
router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .put(uploadBrandImage, resizeImage, UpdateBrandValidator, UpdateBrand)
  .delete(deleteBrandValidator, deleteBrand);
module.exports = router;
