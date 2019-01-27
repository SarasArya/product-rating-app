A sample project in Express, which shows how to transfer global variables like db connection, even when you are running
some script which might require to use those db variables.

It also shows a sample reward system

Server Node.js ⚡️ DB Mongo 🚀

Design Philosphy

1. The system is comprised of 4 tables, namely the User, Product, Order and Rewards
2. User table is because which user gave the rating
3. For which Product,
4. Against what Order
5. What he rated.
6. We first save the rating for a particular product against and order and user in our reward table.
7. Next we try to fetch the product and we can see it gives a ratings and rating object. Ratings is an obj which tells like
   4 people 1 star, 5 people 2 star and the rating gives aggregated value.

To get started

`yarn`

`node one-time-scripts/create-init-data.js`

Take a productId from the rewards array

call this API `http://localhost:8082/api/Product?productId=<your_product_id>`

this should return you the product data with the ratings obj and rating

Watch out for

1. How I have used `require.main === module` a very interesting thing, very few people use
2. everything using ENV variables
3. dynamically creating models using filename
4. using enums to enforce data in mongoose
