import * as expressValidation from "express-validation"
const Joi = expressValidation.Joi
export const validateCreate = expressValidation.validate({
  body: Joi.object({
    name: Joi.string().required(),
    userId: Joi.string().required(),
    deadline: Joi.date().timestamp('javascript').required(),
  })
})