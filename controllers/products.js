const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort('-name price');
  res.status(200).json({
    status: 'success',
    data: products,
    numOfProducts: products.length,
  });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};

  // If property is passed, if not sent empty object and so returns all products
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }; // Case insensitive search
  }

  // console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({
    status: 'success',
    data: products,
    numOfProducts: products.length,
  });
};

module.exports = { getAllProductsStatic, getAllProducts };
