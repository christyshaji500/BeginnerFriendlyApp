const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  image:{
    type:String,
  },
  category: {
    type: String,
    enum: ['Real Estate', 'Vehicles', 'Electronics', 'Jobs', 'Other'], 
  },
  isActive:{
    type:Boolean,
    default:true
  }
});


const Ad = mongoose.model('Ad', AdSchema);

module.exports = Ad;
