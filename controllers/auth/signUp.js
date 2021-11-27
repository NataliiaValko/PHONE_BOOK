const { User } = require('../../models')
const { Conflict } = require('http-errors')
const { nanoid } = require('nanoid')
const gravatar = require('gravatar')
const fs = require('fs/promises')
const path = require('path')
const { sendSuccessToRes, sendMail } = require('../../helpers')
const avatarsDir = path.join(__dirname, '../../public/avatars')

const signUp = async (req, res, next) => {
  const { email, password } = req.body
  const avatarURL = gravatar.url(email, { protocol: 'https', s: '250' })
  const user = await User.findOne({ email })
  if (user) {
    return next(new Conflict('Email in use'))
  }

  const verificationToken = nanoid()
  const newUser = new User({ email, verificationToken, avatarURL })
  newUser.setPassword(password)
  const avatarFolder = path.join(avatarsDir, String(newUser._id))
  await fs.mkdir(avatarFolder)
  await newUser.save()

  const mail = {
    to: email,
    subject: 'Confirm the email address',
    html: `<a href='http://localhost:3000/api/users/verify/${verificationToken}'><h1>Click there for confirming your email address</h1></a>`,
  }
  await sendMail(mail)
  sendSuccessToRes(
    res,
    {
      user: {
        email,
        subscription: 'starter',
      },
    },
    201
  )
}

module.exports = signUp
