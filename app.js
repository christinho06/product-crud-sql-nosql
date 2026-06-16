const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());

// MongoDB routes
app.use('/mongo/products', require('./routes/mongoProducts'));
// MySQL routes
app.use('/sql/products', require('./routes/sqlProducts'));

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/productdb')
  .then(() => console.log('MongoDB connected'));

app.listen(process.env.PORT || 3000, () => console.log('Server running on port 3000'));
module.exports = app;