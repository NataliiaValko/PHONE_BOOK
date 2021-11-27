const { User } = require('../../models')
const { NotFound } = require('http-errors')
const { sendSuccessToRes, sendMail, getBadRequest } = require('../../helpers')
const { nanoid } = require('nanoid')

const reVerify = async (req, res, next) => {
  const { email } = req.body
  if (!email) {
    return next(getBadRequest({ message: 'missing required field email' }))
  }
  const user = await User.findOne({ email })
  if (!user) {
    return next(new NotFound('User not found'))
  }

  if (user.verify) {
    return next(
      getBadRequest({ message: 'Verification has already been passed' })
    )
  }

  const verificationToken = nanoid()
  await User.findOneAndUpdate(user.email, {
    verificationToken,
  })

  const mail = {
    to: email,
    subject: 'Confirm the email address',
    html: `<a href='http://localhost:3000/api/users/verify/${verificationToken}'><h1>Click there for confirming your email address</h1></a>`,
  }
  await sendMail(mail)

  return sendSuccessToRes(res, { message: 'Verification email sent' })
}

module.exports = reVerify
