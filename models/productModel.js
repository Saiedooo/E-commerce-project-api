const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Too short product title'],
      maxlength: [100, 'Too long product title'],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [20, 'Too Short descreption '],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      trim: true,
      max: [200000, 'Too long product price'],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, 'Product image Cover is required'],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Product Must be belong to Category'],
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
    },
    ratingsAverage: {
      type: Number,
      min: [1, 'rating Must be Above or equal 1.0'],
      max: [5, 'rating Must be below or equal 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
//Mongoose query middleWare
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name -_id',
  });
  next();
});
module.exports = mongoose.model('product', productSchema);
