const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, 'SubCategory Must be unique'],
      minlength: [2, 'Too short subCategory'],
      maxlength: [32, 'Too long subCategory'],
    },
    slug: {
      type: String,
      lowerCase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'SubCategory must be belong to parent Category'],
    },
  },
  { timeStamp: true }
);
module.exports = mongoose.model('subCategory', subCategorySchema);
