const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
  fullDesc: {
    type: String,
    require: true
  },
  stockNo: {            //TODO: validate length is exactly 7 digits
    type: Number,
    unique: true,
    required: true,
  },
  year: {
    type: Number,
    required: true
  },
  make: {
    type: String,
    require: true
  },
  model: {
    type: String,
    require: true
  },
  color: {
    type: String,
    require: true
  },
  cylinder: {
    type: Number,   // TODO: validate number is between 0 and 12; 0 indicating electric vehicle
    require: true
  },
  mileage: {
    type: Number,
    require: true
  },
  bodyType: {
    type: String,
    require: true
  },
  class: {
    type: String,
    require: true
  },
  drive: {
    type: String,  // TODO: validate 2WD, AWD or 4WD
    require: true
  },
  // buyDate: {
  //   type: Date,
  //   default: Date.now    // implement when admin interface completed
  // },
  // sellableDate: {
  //   type: Date
  // },
  soldDate: {
    type: Date
  },
  secondDesc: {
    type: String
  },
  options: Array

});

module.exports = mongoose.model('car', CarSchema);