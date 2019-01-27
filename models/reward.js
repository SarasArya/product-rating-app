const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { PRODUCT_RATING } = require('../enums/index');

const modelProperties = {
  rating: {
    type: Number,
    required: true,
    enum: Object.values(PRODUCT_RATING)
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  }
};

const modelOptions = {
  timestamps: true
};

const ratingSchema = Schema(modelProperties, modelOptions);
module.exports = ratingSchema;
