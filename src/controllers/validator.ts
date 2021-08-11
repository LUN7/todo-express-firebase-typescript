import * as expressValidation from "express-validation"
const Joi = expressValidation.Joi
export const validateCreate = expressValidation.validate({
  body: Joi.object({
    name: Joi.string().required(),
    userId: Joi.string().required(),
    deadline: Joi.date().timestamp('javascript').required(),
  })
})

export const validateUpdate = expressValidation.validate({
  params: Joi.object({
    id: Joi.string().required()
  }),
  body: Joi.object({
    name: Joi.string(),
    deadline: Joi.date(),
  })
})