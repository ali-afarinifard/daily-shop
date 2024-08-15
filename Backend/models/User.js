const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  city: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  postalCode: {
    type: Number,
  },
  address: {
    type: String,
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
});

module.exports = mongoose.model('User', UserSchema);
