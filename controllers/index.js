const contacts = require('./contacts')
const {
  logIn,
  signUp,
  updateSubscription,
  logOut,
  getDataCurrentUser,
  updateAvatar,
  verify,
  reVerify,
} = require('./auth')

module.exports = {
  contacts,
  verify,
  signUp,
  logIn,
  updateSubscription,
  updateAvatar,
  logOut,
  reVerify,
  getDataCurrentUser,
}
