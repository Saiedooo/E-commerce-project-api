const factory = require('./handlerFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddlewares');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');
const sharp = require('sharp');
const Brand = require('../models/brandModel');

// Upload Single Image
exports.uploadBrandImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${filename}`);

  // Save image into Db
  req.body.image = filename;

  next();
});

// Get all Categories
exports.getBrands = factory.getAll(Brand);
// get especific Categery
exports.getBrand = factory.getOne(Brand);
// Creat Category
exports.createBrand = factory.createOne(Brand);
// Update specefic Category

exports.UpdateBrand = factory.updateOne(Brand);

// Deleate A specific Category

exports.deleteBrand = factory.deleteOne(Brand);
