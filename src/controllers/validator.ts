import * as expressValidation from "express-validation"
const Joi = expressValidation.Joi

export const ValidationError = expressValidation.ValidationError

export interface IValidationError extends Object {
  details: {
    query: {
      message: string;
    }[];
  }
}

export const ErrorSerializer = (err: IValidationError) => err.details.query.map(({ message }) => message)

export const validateCreate = expressValidation.validate({
  body: Joi.object({
    name: Joi.string().required(),
    userId: Joi.string().required(),
    deadline: Joi.date().timestamp('javascript').required(),
  }).required()
})

export const validateUpdate = expressValidation.validate({
  params: Joi.object({
    id: Joi.string().required()
  }).required(),
  body: Joi.object({
    name: Joi.string(),
    deadline: Joi.date(),
  }).required()
})

export const validateRetrieve = expressValidation.validate({
  params: Joi.object({
    id: Joi.string().required()
  }).required()
})

export const validateList = expressValidation.validate({
  query: Joi.object({
    userId: Joi.string().required()
  }).required()
})

export const validateDelete = expressValidation.validate({
  params: Joi.object({
    id: Joi.string().required()
  }).required()
})