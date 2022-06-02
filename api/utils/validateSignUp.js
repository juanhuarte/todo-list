const joi = require('joi')

module.exports.validateSignUp = (req, res, next) => {
   console.log(req.body)
   const schema = joi.object({
      firstName: joi.string().trim().min(2).required().max(20).messages({
         'string.min': 'Muy cortito',
         'string.max': 'Muy largo',
         'string.empty': 'Ponelo',
      }),
      username: joi
         .string()
         .trim()
         .email()
         //  .message('Tiene que ser un email')
         .required(),
      password: joi.string().trim().min(5).max(10).required(),
   })

   const validation = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
   })

   if (validation.error) {
      // contestar al front y no dejar pasar
      let error = {}
      validation.error.details.forEach((errorObject) => {
         error[errorObject.path[0]] = errorObject.message
      })
      return res.json({ success: false, error })
   }

   next()
}
