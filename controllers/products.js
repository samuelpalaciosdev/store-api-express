const getAllProducts = async (req, res) => {
  res.status(200).json({ status: 'success', data: 'Products' });
};

module.exports = getAllProducts;
