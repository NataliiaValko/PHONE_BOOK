const { Contact } = require('../../models')
const { sendSuccessToRes, getNotFoundId } = require('../../helpers')

const getById = async (req, res, next) => {
  const { contactId } = req.params
  const { _id: ownerId } = req.user
  const condition = { owner: ownerId, _id: contactId }
  const result = await Contact.find(
    condition,
    '_id name email phone favorite owner'
  )

  return result[0]
    ? sendSuccessToRes(res, { result })
    : next(getNotFoundId(contactId))
}

module.exports = getById
