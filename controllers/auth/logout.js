const { User } = require('../../models')
const { sendSuccessToRes } = require('../../helpers')

const logOut = async (req, res, next) => {
  const { _id } = req.user

  await User.findByIdAndUpdate(_id, { token: null })
  sendSuccessToRes(res, _, 204)
}

module.exports = logOut
