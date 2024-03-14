const express = require('express');
const {
  getCategoryValidator,
  createCategoryValidator,
  UpdateCategoryValidator,
  deleteCategoryValidator,
} = require('../utils/validators/categoryValidator');
const {
  getCategories,
  getCategory,
  createCategory,
  UpdateCategory,
  DeleteCategory,
  uploadCategoryImage,
  resizeImage,
} = require('../services/categoryService');

const router = express.Router();

const subcategoryRoute = require('./subCategoryRoute');

router.use('/:categoryId/subcategories', subcategoryRoute);

router
  .route('/')
  .get(getCategories)
  .post(
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory
  );
router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(
    uploadCategoryImage,
    resizeImage,
    UpdateCategoryValidator,
    UpdateCategory
  )
  .delete(deleteCategoryValidator, DeleteCategory);
module.exports = router;
