const mongoose = require('mongoose')

const visitSchema = mongoose.Schema({
  description: {
    type: String
  },
  doctorId: {
    type: String
  },
  patientId: {
    type: String
  },
  price: {
    type: Number
  },
  date: {
    type: Date
  },
  hour: {
    type: Date
  },
  specialization: {
    type: String
  }
})

module.exports = mongoose.model('visits', visitSchema)
