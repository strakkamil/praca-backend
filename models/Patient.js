const mongoose = require('mongoose')

const patientSchema = mongoose.Schema({
  role: {
    type: String,
    default: 'patient'
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
  }
})

module.exports = mongoose.model('patients', patientSchema)