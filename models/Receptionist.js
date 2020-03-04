const mongoose = require('mongoose')

const receptionistSchema = mongoose.Schema({
  role: {
    type: String,
    default: 'admin'
  },
  firstname: {
    type: String,
    min: 3,
    max: 255,
  },
  lastname: {
    type: String,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    min: 3,
    max: 255
  },
  phone: {
    type: Number
  },
  pesel: {
    type: Number
  },
  city: {
    type: String
  },
  street: {
    type: String
  },
  password: {
    type: String
  }
})

module.exports = mongoose.model('receptionists', receptionistSchema)