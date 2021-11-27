const signUp = require('./signUp')
const logIn = require('./logIn')
const logOut = require('./logout')
const updateSubscription = require('./updateSubscription')
const getDataCurrentUser = require('./getDataCurrentUser')
const updateAvatar = require('./updateAvatar')
const verify = require('./verify')
const reVerify = require('./reVerify')

module.exports = {
  signUp,
  verify,
  logIn,
  logOut,
  updateSubscription,
  getDataCurrentUser,
  updateAvatar,
  reVerify,
}
