const { check, Result, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Category = require('../../models/categoryModel');
const SubCategory = require('../../models/subCategoryModel');
const { toString } = require('express-validator/src/utils');
const { default: slugify } = require('slugify');
exports.createProductValidator = [
  check('title')
    .isLength({ min: 3 })
    .withMessage('Must be at least 3 chars')
    .notEmpty()
    .withMessage('product Required')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('description')
    .notEmpty()
    .withMessage('Product description is required ')
    .isLength({ max: 2000 })
    .withMessage('Too long description'),
  check('quantity')
    .notEmpty()
    .withMessage('Product quantity is Required')
    .isNumeric()
    .withMessage('Product quantity Must be A Number'),
  check('sold')
    .optional()
    .isNumeric()
    .withMessage('Product quantity Must be a Number'),
  check('price')
    .notEmpty()
    .withMessage('Product Price is required')
    .isNumeric()
    .withMessage('Product Price Must be a number')
    .isLength({ max: 32 })
    .withMessage('Too long Price'),
  check('priceAfterDiscount')
    .optional()
    .isNumeric()
    .toFloat()
    .withMessage('Product PriceAfterDiscount Must be a number')
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error('PriceAfterDiscount Must be lower than Price');
      }
      return true;
    }),

  check('colors')
    .optional()
    .isArray()
    .withMessage('availableColors should be array String'),
  check('imageCover').notEmpty().withMessage('Product imageCover is required'),
  check('images')
    .optional()
    .isArray()
    .withMessage('images should be array of string'),
  check('category')
    .notEmpty()
    .withMessage('Invalid ID formate')
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id: ${categoryId}`)
          );
        }
      })
    ),
  check('subcategories')
    .optional()
    .isMongoId()
    .withMessage('Invalid ID formate')
    .custom((subcategoriesIds) =>
      SubCategory.find({ _id: { $exists: true, $in: subcategoriesIds } }).then(
        (result) => {
          if (result.length < 1 || result.length != subcategoriesIds.length) {
            return Promise.reject(
              new Error(`No Subcategories for this id: ${subcategoriesIds}`)
            );
          }
        }
      )
    )
    .custom((val, { req }) =>
      SubCategory.find({ category: req.body.category }).then(
        (subcategories) => {
          const subCategoriesIdsInDB = [];
          subcategories.forEach((SubCategory) => {
            subCategoriesIdsInDB.push(SubCategory._id.toString());
          });
          const checker = (target, arr) => target.every((v) => arr.includes(v));
          if (!checker(val, subCategoriesIdsInDB)) {
            return Promise.reject(
              new Error('subcategories not belong to Category')
            );
          }
        }
      )
    ),
  check('brand').optional().isMongoId().withMessage('Invalid Id formate'),
  check('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('ratingsAverage Must be a number')
    .isLength({ min: 1 })
    .withMessage('Rating Must be above or equal 1.0')
    .isLength({ max: 5 })
    .withMessage('Rating Must be below or equal 5.0'),
  check('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage('ratingsQuantity Must be Number'),

  validatorMiddleware,
];

exports.getProductValidator = [
  check('id').isMongoId().withMessage('Invalid id format'),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check('id').isMongoId().withMessage('Invalid id format'),
  body('title')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check('id').isMongoId().withMessage('Invalid id format'),
  validatorMiddleware,
];
