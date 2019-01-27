const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelProperties = {
  name: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
};

const modelOptions = {
  timestamps: true
};

const userSchema = Schema(modelProperties, modelOptions);
module.exports = userSchema;
