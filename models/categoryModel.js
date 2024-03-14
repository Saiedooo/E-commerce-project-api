const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'category required'],
      unique: [true, 'Category Must be unique'],
      minlength: [3, 'too short Category Name'],
      maxlength: [32, 'too long Category Name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};
// Get All , Find One,Update
categorySchema.post('init', (doc) => {
  setImageURL(doc);
});
// Create
categorySchema.post('save', (doc) => {
  setImageURL(doc);
});

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
