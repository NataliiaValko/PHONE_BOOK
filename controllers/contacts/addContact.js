const { Contact } = require('../../models')
const { sendSuccessToRes } = require('../../helpers')

const addContact = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id }
  const result = await Contact.create(newContact)
  sendSuccessToRes(res, { result }, 201)
}

module.exports = addContact
