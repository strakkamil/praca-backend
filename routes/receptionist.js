const router = require('express').Router()
const Receptionist = require('../models/Receptionist')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerReceptionist, loginReceptionist } = require('../validation')
const auth = require('./auth')

// router.get('/', (req, res) => {
//   Receptionist.find()
//     .then(receptionists => res.json(receptionists))
//     .catch(err => res.status(400).send(`Error: ${err}`))
// })

router.post('/register', async (req, res) => {
  const { error } = registerReceptionist(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const receptionist = new Receptionist({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    pesel: req.body.pesel,
    city: req.body.city,
    street: req.body.street,
    password: hashedPassword
  })

  const emailExist = await Receptionist.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).json({ emailIsExist: true })

  try {
    const savedReceptionist = await receptionist.save()
    res.send(savedReceptionist)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/login', async (req, res) => {
  const { error } = loginReceptionist(req.body)
  if (error) return res.status(404).send(error.details[0].message)

  const receptionist = await Receptionist.findOne({ email: req.body.email })
  if (!receptionist) return res.status(404).send(`${req.body.email} nie znajduje się w bazie`)
  const validPassword = await bcrypt.compare(req.body.password, receptionist.password)
  if (!validPassword) return res.status(400).send('Złe hasło')

  const token = jwt.sign({ _id: receptionist._id }, process.env.TOKEN_SECRET)
  res.header('authorization', token)
  res.header('id', receptionist._id).json({ "token": token, "id": receptionist._id })
})

router.get('/', auth, (req, res) => {
  res.json({ role: 'admin', isAccess: true })
})

router.get('/edit/:id', auth, (req, res) => {
  Receptionist.findById(req.params.id)
    .then(receptionist => res.json(receptionist))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.patch('/edit/:id', (req, res) => {
  const id = req.params.id
  Receptionist.updateOne({ _id: id }, {
    $set: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      pesel: req.body.pesel,
      city: req.body.city,
      street: req.body.street
    }
  })
    .then(res => console.log('Zmodyfikowano'))
})

module.exports = router