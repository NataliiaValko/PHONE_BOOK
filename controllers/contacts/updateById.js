const { Contact } = require('../../models')
const { sendSuccessToRes, getNotFoundId } = require('../../helpers')

const updateById = async (req, res, next) => {
  const { contactId } = req.params
  const { _id: ownerId } = req.user
  const condition = { owner: ownerId, _id: contactId }

  const result = await Contact.findOneAndUpdate(condition, req.body, {
    new: true,
  })
  return result[0]
    ? sendSuccessToRes(res, { result })
    : next(getNotFoundId(contactId))
}

module.exports = updateById
