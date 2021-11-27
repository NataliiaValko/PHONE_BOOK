const { Contact } = require('../../models')
const { sendSuccessToRes, getNotFoundId } = require('../../helpers')

const removeById = async (req, res, next) => {
  const { contactId } = req.params
  const { _id: ownerId } = req.user
  const condition = { owner: ownerId, _id: contactId }

  const result = await Contact.findOneAndRemove(condition)

  return result
    ? sendSuccessToRes(res, { message: 'Remove success' })
    : next(getNotFoundId(contactId))
}

module.exports = removeById
