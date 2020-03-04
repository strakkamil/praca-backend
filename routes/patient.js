const router = require('express').Router()
const Patient = require('../models/Patient')
const bcrypt = require('bcryptjs')
const { registerPatient } = require('../validation')

router.post('/register', async (req, res) => {
  const { error } = registerPatient(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const patient = new Patient({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    pesel: req.body.pesel,
    city: req.body.city,
    street: req.body.street,
    password: hashedPassword,
    visits: req.body.visits,
    tests: req.body.tests
  })

  const emailExist = await Patient.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).json({ emailIsExist: true })

  try {
    const savedPatient = await patient.save()
    res.send(savedPatient)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router