const { getBadRequest } = require('../helpers')

const validation = (schema) => {
  return async (req, _, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      next(getBadRequest(error))
    }
    next()
  }
}

module.exports = validation
