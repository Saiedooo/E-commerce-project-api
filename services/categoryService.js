const factory = require('./handlerFactory');

const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');
const sharp = require('sharp');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddlewares');
const Category = require('../models/categoryModel');

// Upload Single Image
exports.uploadCategoryImage = uploadSingleImage('image');

//image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${filename}`);

  // Save image into Db
  req.body.image = filename;

  next();
});
// Get all Categories
exports.getCategories = factory.getAll(Category);

// get especific Categery
exports.getCategory = factory.getOne(Category);

// Creat Category
exports.createCategory = factory.createOne(Category);
// Update specefic Category

exports.UpdateCategory = factory.updateOne(Category);

// Deleate A specific Category

exports.DeleteCategory = factory.deleteOne(Category);
