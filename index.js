const app = require('express')();
const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const util = require('util');
const path = require('path');
const bodyparser = require('body-parser');
const _ = require('lodash');
dotenv.config();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const {
  MONGODB_CONNECTION_STRING = 'mongodb://localhost:27017/casaone_dev',
  PORT = 8082,
  NODE_ENV = 'development'
} = process.env;

const fsreaddirPromisified = util.promisify(fs.readdir);
const { beautifiedFileName } = require('./utils/helper-util');
const dbModelLocation = path.join(__dirname, 'models');

app.post('/api/Orders/saveFeedback', async (req, reply) => {
  // save feedback from order
});

app.get('/api/Product', async (req, reply) => {
  const { Reward, Product } = app.locals.Models;
  const { productId } = req.query;
  let product = await Product.findOne({ _id: productId });
  const rewards = await Reward.find({ product: productId });
  const ratingReverseMap = _.groupBy(rewards, 'rating');
  const ratingObj = {};
  _.range(1, 6).map(rating => {
    if (ratingReverseMap[rating]) {
      ratingObj[rating] = ratingReverseMap[rating].length;
    } else {
      ratingObj[rating] = 0;
    }
  });
  const numerator = Object.keys(ratingObj)
    .map(rating => ratingObj[rating] * +rating)
    .reduce((acc, val) => acc + val, 0);
  const denominator = Object.values(ratingObj).reduce((acc, val) => acc + +val, 0);
  product = product.toJSON();
  product.ratings = ratingObj;
  product.rating = Math.round(numerator / denominator);

  return reply.send({ product });
});

app.start = async function() {
  const connection = await mongoose.connect(MONGODB_CONNECTION_STRING, {
    autoIndex: false,
    useNewUrlParser: true
  });
  const Models = {};
  const files = await fsreaddirPromisified(dbModelLocation);
  files.forEach(file => {
    const ModelName = beautifiedFileName(file);
    const Model = require(`${dbModelLocation}/${file}`);
    Models[ModelName] = connection.model(ModelName, Model);
  });
  app.locals.Models = Models;
  process.emit('dbStarted');
};

// if I am calling function from outside this file, like from a script dont start the server
if (require.main === module) {
  app.listen(PORT, async function() {
    // establish db connections
    try {
      await app.start();
      console.log(`Server is now running at port ${PORT} in ${NODE_ENV} mode`);
    } catch (err) {
      console.error(err);
    }
  });
} else {
  app.start();
}

module.exports.app = app;
