const { BadRequest } = require('http-errors')

const getBadRequest = (error) => {
  return new BadRequest(error.message)
}

module.exports = getBadRequest
