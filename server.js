const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const receptionistRoute = require('./routes/receptionist')
const rootRoute = require('./routes/root')
const patientRoute = require('./routes/patient')

const port = process.env.PORT || 5000

app.use(cors())
require('dotenv').config()
app.use(express.json())

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Połączono z bazą danych medicalclinic')
})

app.get('/', (req, res) => {
  res.send('hehe')
})

app.use('/receptionist', receptionistRoute)
app.use('/root', rootRoute)
app.use('/patient', patientRoute)

app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie: ${port}`)
})