const { Contact } = require('../../models')
const {
  sendSuccessToRes,
  getNotFoundId,
  getBadRequest,
} = require('../../helpers')

const updateStatusContact = async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(getBadRequest({ message: 'missing field favorite' }))
  }

  const { contactId } = req.params
  const { _id: ownerId } = req.user
  const condition = { owner: ownerId, _id: contactId }

  const result = await Contact.findOneAndUpdate(
    condition,
    { favorite: req.body.favorite },
    {
      new: true,
    }
  )

  return result
    ? sendSuccessToRes(res, { result })
    : next(getNotFoundId(contactId))
}

module.exports = updateStatusContact
