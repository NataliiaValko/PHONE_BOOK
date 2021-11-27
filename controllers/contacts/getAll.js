const { Contact } = require('../../models')
const { sendSuccessToRes } = require('../../helpers')

const getAll = async (req, res) => {
  const { _id } = req.user
  const { page, limit, favorite } = req.query
  const condition = { owner: _id }

  if (favorite !== undefined) {
    condition.favorite = favorite
  }

  if (page && limit) {
    const skip = (page - 1) * limit
    const result = await Contact.find(
      condition,
      '_id name email phone favorite owner',
      { skip, limit: +limit }
    ).populate('owner', '_id email')

    sendSuccessToRes(res, { result })
    return
  }

  const result = await Contact.find(
    condition,
    '_id name email phone favorite owner'
  ).populate('owner', '_id email')

  sendSuccessToRes(res, { result })
}

module.exports = getAll
