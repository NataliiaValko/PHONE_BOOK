const express = require('express')
const { joiUserSchema, joiSubscriptionSchema } = require('../../models')
const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require('../../middlewares')
const {
  signUp,
  logIn,
  logOut,
  updateSubscription,
  updateAvatar,
  verify,
  reVerify,
  getDataCurrentUser,
} = require('../../controllers')
const router = new express.Router()

router.post('/signup', validation(joiUserSchema), controllerWrapper(signUp))
router.post('/login', validation(joiUserSchema), controllerWrapper(logIn))
router.post('/verify', controllerWrapper(reVerify))
router.get('/verify/:verificationToken', controllerWrapper(verify))

router.get('/current', authenticate, controllerWrapper(getDataCurrentUser))
router.get('/logout', authenticate, controllerWrapper(logOut))
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatarURL'),
  controllerWrapper(updateAvatar)
)
router.patch(
  '/',
  authenticate,
  validation(joiSubscriptionSchema),
  controllerWrapper(updateSubscription)
)

module.exports = router
