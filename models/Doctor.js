const mongoose = require('mongoose')

const doctorSchema = mongoose.Schema({
  role: {
    type: String,
    default: 'doctor'
  },
  firstname: {
    type: String,
    min: 3,
    max: 255
  },
  lastname: {
    type: String,
    min: 3,
    max: 255
  },
  email: {
    type: String
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
  },
  visits: {
    type: Array,
    default: []
  },
  tests: {
    type: Array,
    default: []
  },
  specialization: {
    type: String
  }
})

module.exports = mongoose.model('doctors', doctorSchema)