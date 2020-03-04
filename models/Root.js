const mongoose = require('mongoose')

const rootSchema = mongoose.Schema({
  role: {
    type: String,
    default: 'root'
  },
  login: {
    type: String
  },
  password: {
    type: String
  }
})

module.exports = mongoose.model('superuser', rootSchema)