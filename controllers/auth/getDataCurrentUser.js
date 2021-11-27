const { sendSuccessToRes } = require('../../helpers')

const getDataCurrentUser = async (req, res) => {
  const { email, subscription } = req.user

  sendSuccessToRes(res, {
    email,
    subscription,
  })
}

module.exports = getDataCurrentUser
