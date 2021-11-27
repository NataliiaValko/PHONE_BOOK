const { NotFound } = require('http-errors')

const getNotFoundId = (contactId) => {
  return new NotFound(`Contact with id '${contactId}' not found`)
}

module.exports = getNotFoundId
