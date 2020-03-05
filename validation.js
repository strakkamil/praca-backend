const Joi = require('@hapi/joi')

const registerReceptionist = data => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(50).required(),
    lastname: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).required().email(),
    phone: Joi.number().required(),
    pesel: Joi.number().required(),
    city: Joi.string().min(3).required(),
    street: Joi.string().min(3).required(),
    password: Joi.string().min(8).required()
  })
  return schema.validate(data)
}

const loginReceptionist = data => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required()
  })
  return schema.validate(data)
}

const loginRoot = data => {
  const schema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required()
  })
  return schema.validate(data)
}

const registerPatient = data => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(50).required(),
    lastname: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).required().email(),
    phone: Joi.number().required(),
    pesel: Joi.number().required(),
    city: Joi.string().min(3).required(),
    street: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    visits: Joi.array(),
    tests: Joi.array()
  })
  return schema.validate(data)
}

const loginPatient = data => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required()
  })
  return schema.validate(data)
}

module.exports.registerReceptionist = registerReceptionist
module.exports.loginReceptionist = loginReceptionist
module.exports.loginRoot = loginRoot
module.exports.registerPatient = registerPatient
module.exports.loginPatient = loginPatient