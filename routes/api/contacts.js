const express = require('express')
const { joiContactSchema, joiFavoriteSchema } = require('../../models')
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares')
const {
  getAll,
  getById,
  addContact,
  updateById,
  removeById,
  updateStatusContact,
} = require('../../controllers/contacts')
const router = new express.Router()

router.get('/', authenticate, controllerWrapper(getAll))

router.get('/:contactId', authenticate, controllerWrapper(getById))

router.post(
  '/',
  authenticate,
  validation(joiContactSchema),
  controllerWrapper(addContact)
)

router.put(
  '/:contactId',
  authenticate,
  validation(joiContactSchema),
  controllerWrapper(updateById)
)

router.patch(
  '/:contactId/favorite',
  authenticate,
  validation(joiFavoriteSchema),
  controllerWrapper(updateStatusContact)
)

router.delete('/:contactId', authenticate, controllerWrapper(removeById))

module.exports = router
