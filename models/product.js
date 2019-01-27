const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelProperties = {
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
};

const modelOptions = {
  timestamps: true
};

const productSchema = Schema(modelProperties, modelOptions);
module.exports = productSchema;
