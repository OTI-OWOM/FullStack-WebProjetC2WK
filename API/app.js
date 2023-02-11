/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config();

const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');

mongoose.connect(`mongodb://${process.env.NAME}:${process.env.PASSWORD}@mongo:27017`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB successfully !'))
    .catch((error) => console.log(`MongoDB connection failed !\n${error}`));

const app = express();

// We use helmet to secure our application headers
app.use(helmet());

// CORS : Cross-Origin Ressource Sharing
app.use((req, res, next) => {
    // Everybody can access the app
    res.setHeader('Access-Control-Allow-Origin', '*');
    // allow these headers
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Allow these methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// analyze request body
app.use(express.json());

app.use(productRoutes);
app.use(userRoutes);

module.exports = app;
