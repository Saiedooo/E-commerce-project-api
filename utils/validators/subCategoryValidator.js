const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const { default: slugify } = require('slugify');
exports.getSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Subcategory id format'),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('SubCategory required')
    .isLength({ min: 2 })
    .withMessage('Too short category name')
    .isLength({ max: 32 })
    .withMessage('Too long category name'),
  check('category')
    .notEmpty()
    .withMessage('SubCategory must not be long to category')
    .isMongoId()
    .withMessage('Invalid category id format')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.UpdateSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Subcategory id format'),
  body('name')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Subcategory id format'),
  validatorMiddleware,
];
