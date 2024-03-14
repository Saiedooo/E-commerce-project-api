const express = require('express');
const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  UpdateSubCategory,
  DeleteSubCategory,
  setCategoryIdToBody,
  creatFilterObj,
} = require('../services/subCategoryService');
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  UpdateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require('../utils/validators/subCategoryValidator');
const subCategoryModel = require('../models/subCategoryModel');
// Merge parms Allow us to access parameters on other routers
// We need to access categoryId from category router
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(creatFilterObj, getSubCategories);
router
  .route('/:id')
  .get(getSubCategoryValidator, getSubCategory)
  .put(UpdateSubCategoryValidator, UpdateSubCategory)
  .delete(deleteSubCategoryValidator, DeleteSubCategory);

module.exports = router;
