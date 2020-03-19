const router = require('express').Router()
const Visit = require('../models/Visit')

router.post('/add', async (req, res) => {
  const visit = new Visit({
    description: req.body.description,
    doctorId: req.body.doctorId,
    patientId: req.body.patientId,
    price: req.body.price,
    date: req.body.date
  })

  const visitExist = await Visit.findOne({ date: req.body.date })
  if (visitExist) return res.status(400).json({ visitExist: true })

  try {
    const savedVisit = await visit.save()
    res.send(savedVisit)
  }
  catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router