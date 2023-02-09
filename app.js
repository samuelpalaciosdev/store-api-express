const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const connectDb = require('./db/connect');
const router = require('./routes/products');
require('dotenv').config();

// Middleware
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
app.use(express.json());

// Routes

app.use('/api/v1/products', router);

app.get('/', (req, res) => {
  res.status(200).send('Home page');
});

// Utility middleware
app.use(notFound);
app.use(errorHandler);

// Start up server
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
