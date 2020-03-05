const router = require('express').Router()
const Root = require('../models/Root')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { loginRoot } = require('../validation')
const auth = require('./auth')

router.post('/login', async (req, res) => {
  const { error } = loginRoot(req.body)
  if (error) return res.status(404).send(error.details[0].message)

  const root = await Root.findOne({ login: req.body.login })
  if (!root) return res.status(404).send(`${req.body.login} nie znajduje się w bazie`)
  const validPassword = await bcrypt.compare(req.body.password, root.password)
  if (!validPassword) return res.status(400).send(`Złe hasło`)

  const token = jwt.sign({ _id: root._id }, process.env.TOKEN_SECRET)
  res.header('authorization', token).send(token)
})

router.get('/', auth, (req, res) => {
  res.json({ role: 'root', isAccess: true })
})

// router.post('/register', async (req, res) => {
//   const { error } = loginRoot(req.body)
//   if (error) return res.status(400).send(error.details[0].message)

//   const salt = await bcrypt.genSalt(10)
//   const hashedPassword = await bcrypt.hash(req.body.password, salt)

//   const root = new Root({
//     login: req.body.login,
//     password: hashedPassword
//   })

//   try {
//     const savedRoot = await root.save()
//     res.send(savedRoot)
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })

module.exports = router