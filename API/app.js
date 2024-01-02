/* eslint-disable no-console */
const express = require('express');
const db = require('./db/models');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const carDetailRoutes = require('./routes/car-details');
const carImagesRoutes = require('./routes/car-images');
const carBrandsRoutes = require('./routes/car-brands');

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
const app = express();
const allowedOrigins = ['http://localhost:4200', 'https://mileristovski.fr'];
// We use helmet to secure our application headers
app.use(helmet());

// CORS : Cross-Origin Ressource Sharing
app.use((req, res, next) => {
  const origin = req.headers.origin;
  // Everybody can access the app
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // allow these headers
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // Allow these methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

// analyze request body
app.use(express.json());
app.use(cookieParser());
app.use(productRoutes);
app.use(userRoutes);
app.use(carBrandsRoutes);
app.use(carDetailRoutes);
app.use(carImagesRoutes);

module.exports = app;
