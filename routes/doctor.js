const router = require('express').Router()
const Doctor = require('../models/Doctor')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { registerDoctor, loginDoctor } = require('../validation')
const auth = require('./auth')

router.get('/', (req, res) => {
  Doctor.find()
    .then(doctor => res.json(doctor))
    .catch(err => res.status(400).send(`Error: ${err}`))
})

router.post('/register', async (req, res) => {
  const { error } = registerDoctor(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const doctor = new Doctor({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    pesel: req.body.pesel,
    city: req.body.city,
    street: req.body.street,
    password: hashedPassword,
    visits: req.body.visits,
    tests: req.body.tests,
    specialization: req.body.specialization
  })

  const emailExist = await Doctor.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).json({ emailIsExist: true })

  try {
    const savedDoctor = await doctor.save()
    res.send(savedDoctor)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/login', async (req, res) => {
  const { error } = loginDoctor(req.body)
  if (error) return res.status(404).send(error.details[0].message)

  const doctor = await Doctor.findOne({ email: req.body.email })
  if (!doctor) return res.status(404).send(`${req.body.email} nie znajduje się w bazie`)
  const validPassword = await bcrypt.compare(req.body.password, doctor.password)
  if (!validPassword) return res.status(400).send('Złe hasło')

  const token = jwt.sign({ _id: doctor._id }, process.env.TOKEN_SECRET)
  res.header('authorization', token)
  res.header('id', doctor._id).json({ "token": token, "id": doctor._id })
})

router.get('/login', auth, (req, res) => {
  res.json({ role: 'doctor', isAccess: true })
})

router.delete('/delete/:id', (req, res) => {
  Doctor.findByIdAndDelete(req.params.id)
    .then(() => res.json('Usunięto lekarza'))
    .catch(err => console.log(`Error: ${err}`))
})

router.get('/edit/:id', auth, (req, res) => {
  Doctor.findById(req.params.id)
    .then(doctor => res.json(doctor))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.patch('/edit/:id', auth, (req, res) => {
  const id = req.params.id
  Doctor.updateOne({ _id: id }, {
    $set: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      pesel: req.body.pesel,
      city: req.body.city,
      street: req.body.street,
      specialization: req.body.specialization
    }
  })
    .then(res => console.log('Zmodyfikowano'))
})

module.exports = router