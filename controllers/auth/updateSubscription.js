const { User } = require('../../models')
const { getNotFoundId } = require('http-errors')
const { sendSuccessToRes } = require('../../helpers')

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user
  const { subscription } = req.body
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  )

  return result ? sendSuccessToRes(res, { result }) : next(getNotFoundId(_id))
}

module.exports = updateSubscription
