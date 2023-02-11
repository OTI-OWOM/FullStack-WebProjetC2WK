const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Create a data schema for users in MongoDB
const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String },
    email: { type: String, unique: true },
    adresse: { type: String },
    __v: { type: Number, select: false },
});

// Check if the username & email have not already been used
userSchema.plugin(uniqueValidator);

// Create a model from the schema
module.exports = mongoose.model('User', userSchema);
