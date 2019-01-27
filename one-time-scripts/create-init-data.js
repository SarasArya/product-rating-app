const { app } = require('../index');

const createDemoData = async () => {
  const Promise = require('bluebird');
  const { DELIVERY_STATUS, PAYMENT_STATUS } = require('../enums/index');
  const { User, Product, Order, Reward } = app.locals.Models;
  // create users
  const usersToBeCreated = [
    {
      name: 'Test User',
      emailId: 'test@example.com',
      password: 'testingpassword'
    },
    {
      name: 'Guest User',
      emailId: 'user@example.com',
      password: 'testedPassword'
    }
  ];

  const users = await Promise.map(usersToBeCreated, user => User.create(user));

  // create products
  const productsToBeCreated = [
    {
      name: 'Next level Sofa',
      description: 'Very comfortable',
      price: 1000
    },
    {
      name: 'Dining Table',
      description: 'Family that eats together, stays together',
      price: 1000
    },
    {
      name: 'Queen Bed',
      description: 'Queen slept here',
      price: 500
    },
    {
      name: 'Study Table',
      description: 'Only if you are the studious type',
      price: 600
    },
    {
      name: 'Water Filter',
      description: 'Saaf paani peeo',
      price: 400
    }
  ];

  const products = await Promise.map(productsToBeCreated, product => Product.create(product));

  // create orders
  const ordersToBeCreated = [
    {
      paymentStatus: PAYMENT_STATUS.SUCCESSFUL,
      deliveryStatus: DELIVERY_STATUS.DELIVERED.value,
      user: users[0]._id,
      orderDate: new Date(),
      uniqueId: 'CASAFUR001',
      product: products[0]._id
    },
    {
      paymentStatus: PAYMENT_STATUS.SUCCESSFUL,
      deliveryStatus: DELIVERY_STATUS.DELIVERED.value,
      user: users[1]._id,
      orderDate: new Date(),
      uniqueId: 'CASAPP001',
      product: products[1]._id
    }
  ];

  const orders = await Promise.map(ordersToBeCreated, order => Order.create(order));

  // create some rewards
  const rewardsToBeCreated = [
    {
      rating: 5,
      order: orders[0]._id,
      product: orders[0].product,
      user: users[0]._id
    },
    {
      rating: 5,
      order: orders[0]._id,
      product: orders[0].product,
      user: users[0]._id
    },
    {
      rating: 5,
      order: orders[0]._id,
      product: orders[0].product,
      user: users[0]._id
    },
    {
      rating: 4,
      order: orders[0]._id,
      product: orders[0].product,
      user: users[0]._id
    },
    {
      rating: 1,
      order: orders[0]._id,
      product: orders[0].product,
      user: users[0]._id
    },
    {
      rating: 1,
      order: orders[0]._id,
      product: orders[0].product,
      user: users[0]._id
    },
    {
      rating: 4,
      order: orders[1]._id,
      product: orders[1].product,
      user: users[1]._id
    }
  ];
  const rewards = await Promise.map(rewardsToBeCreated, reward => Reward.create(reward));
  console.log(rewards);
};

process.on('dbStarted', async () => {
  try {
    await createDemoData();
  } catch (err) {
    console.log(err);
  }
  process.exit(0);
});
