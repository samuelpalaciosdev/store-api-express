const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort('name').select('name price');
  res.status(200).json({
    status: 'success',
    data: products,
    numOfProducts: products.length,
  });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, select } = req.query;
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
  let result = Product.find(queryObject); //Find the products that match the queryObject props

  // SORT
  if (sort) {
    // As query params are passed with commas (to separate them), replace commas with spaces
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  //SELECT

  if (select) {
    const selectList = select.split(',').join(' ');
    result = result.select(selectList);
  }

  // PAGINATION

  // page query passed by user or 1 by default
  const page = Number(req.query.page) || 1;
  // limit query passed by user or 10 by default
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  // RESPONSE
  const products = await result;
  res.status(200).json({
    status: 'success',
    data: products,
    numOfProducts: products.length,
  });
};

module.exports = { getAllProductsStatic, getAllProducts };
