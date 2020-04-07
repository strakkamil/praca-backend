const router = require('express').Router()
const Visit = require('../models/Visit')
const auth = require('./auth')

// router.post('/add', async (req, res) => {
//   const visit = new Visit({
//     description: req.body.description,
//     doctorId: req.body.doctorId,
//     patientId: req.body.patientId,
//     price: req.body.price,
//     date: req.body.date
//   })

//   const visitExist = await Visit.findOne({ date: req.body.date })
//   if (visitExist) return res.status(400).json({ visitExist: true })

//   try {
//     const savedVisit = await visit.save()
//     res.send(savedVisit)
//   }
//   catch (error) {
//     res.status(400).send(error)
//   }
// })

router.post('/add', auth, async (req, res) => {
  const doctorId = req.body.doctorId
  const selectedDate = req.body.selectedDate
  const selectedStartTime = req.body.selectedStartTime
  const selectedEndTime = req.body.selectedEndTime
  const specialization = req.body.specialization
  const visits = []
  for (let i = selectedStartTime; i < selectedEndTime; i += 1200000) {
    const visit = {
      description: '',
      doctorId: doctorId,
      patientId: '',
      price: 150,
      date: selectedDate,
      hour: i,
      specialization: specialization
    }
    visits.push(visit)
  }

  const insertMany = await Visit.insertMany(visits, function (error, docs) {
    if (error) {
      console.log(error)
    }
    res.status(200).send(insertMany)
  })
})

router.get('/doctor/:id', auth, (req, res) => {
  Visit.find({ doctorId: req.params.id })
    .then(visits => res.json(visits))
    .catch(err => res.status(400).send(`Error: ${err}`))
})

router.patch('/signup/:id', auth, (req, res) => {
  const id = req.params.id
  const patientId = req.body.patientId
  Visit.updateOne({ _id: id }, {
    $set: {
      patientId: patientId
    }
  })
    .then(res => console.log('Zmodyfikowano'))
})

router.get('/patient/:id', auth, (req, res) => {
  Visit.find({ patientId: req.params.id })
    .then(visits => res.json(visits))
    .catch(err => res.status(400).send(`Error: ${err}`))
})


module.exports = router