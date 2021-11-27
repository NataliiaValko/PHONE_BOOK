const { User } = require('../../models')
const { NotFound } = require('http-errors')
const { sendSuccessToRes } = require('../../helpers')

const verify = async (req, res, next) => {
  const { verificationToken } = req.params
  const user = await User.findOneAndUpdate(
    { verificationToken },
    {
      verificationToken: null,
      verify: true,
    }
  )

  return user
    ? sendSuccessToRes(res, { message: 'Verification successful' })
    : next(new NotFound('User not found'))
}

module.exports = verify
