const SubCategory = require('../models/subCategoryModel');
const factory = require('./handlerFactory');

exports.setCategoryIdToBody = (req, res, next) => {
  // Nested Route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// filter Object

exports.creatFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };

  req.filterObj = filterObject;
  next();
};

// Get all SubCategories
exports.getSubCategories = factory.getAll(SubCategory);
// .populate({ path: 'category', select: 'name -_id' });

// get especific SubCategery
exports.getSubCategory = factory.getOne(SubCategory);

// Creat SubCategory

exports.createSubCategory = factory.createOne(SubCategory);

// Update specefic SubCategory

exports.UpdateSubCategory = factory.updateOne(SubCategory);

// Deleate A specific SubCategory

exports.DeleteSubCategory = factory.deleteOne(SubCategory);
