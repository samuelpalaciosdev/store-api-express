require('dotenv').config();

const connectDb = require('./db/connect');
const Product = require('./models/product');
const jsonProducts = require('./products.json');

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    await Product.deleteMany(); // Delete all the products in the db
    await Product.create(jsonProducts); // Create products based on our schema with the data on jsonProducts
    console.log('Successfull connection!!!');
    process.exit(0); // If successful connection, then terminate the process
  } catch (err) {
    console.log(err);
    process.exit(1); // If failed connection, then terminate the process
  }
};

start();
