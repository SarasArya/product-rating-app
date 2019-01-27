const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DELIVERY_STATUS, PAYMENT_STATUS } = require('../enums/index');

const modelProperties = {
  paymentStatus: {
    type: String,
    required: true,
    enum: Object.values(PAYMENT_STATUS)
  },
  deliveryStatus: {
    type: String,
    required: true,
    enum: Object.values(DELIVERY_STATUS).map(obj => obj.value)
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
  orderDate: {
    type: Date,
    required: true
  },
  uniqueId: {
    type: String,
    required: true
    // human readable Id
  }
};

const modelOptions = {
  timestamps: true
};

const orderSchema = Schema(modelProperties, modelOptions);
module.exports = orderSchema;
