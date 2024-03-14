const multer = require('multer');
const APiError = require('../utils/apiError');

exports.uploadSingleImage = (fieldName) => {
  // DisckStorage
  // const multerStorage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, 'uploads/categories');
  //   },
  //   filename: function (req, file, cb) {
  //     const ext = file.mimetype.split('/')[1];
  //     const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
  //     cb(null, filename);
  //   },
  // });

  //  -----------------------------------------------------------

  const multerStorage = multer.memoryStorage();

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new APiError(`Only images allowed`, 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload.single(fieldName);
};
