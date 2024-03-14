const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'brnad required'],
      unique: [true, 'brnad Must be unique'],
      minlength: [3, 'too short brnad Name'],
      maxlength: [32, 'too long brnad Name'],
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
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};
// Get All , Find One,Update
brandSchema.post('init', (doc) => {
  setImageURL(doc);
});
// Create
brandSchema.post('save', (doc) => {
  setImageURL(doc);
});

module.exports = mongoose.model('Brnad', brandSchema);
