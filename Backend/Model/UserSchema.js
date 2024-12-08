const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], 
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    default: '',
    match: [/^\+?[1-9]\d{1,14}$/, 'Please use a valid phone number'], 
  },
  location: {
    type: String,
    default: '',
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  image:{
    type:String
  },
  ads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ad', 
    },
  ],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
