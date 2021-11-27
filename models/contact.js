const { Schema, model } = require('mongoose')
const Joi = require('joi')

const PATTERNS = {
  phone:
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/,
  name: /^([A-Z]?[a-z]+([ ]?[a-z]?['-]?[A-Z]?[a-z]+)*)$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: null,
}

const contactSchema = Schema(
  {
    name: {
      type: String,
      match: PATTERNS.name,
      required: [true, 'Set name for contact'],
    },
    email: { type: String, match: PATTERNS.email, required: true },
    phone: { type: String, match: PATTERNS.phone, required: true },
    favorite: { type: Boolean, default: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
)

const joiContactSchema = Joi.object({
  name: Joi.string().pattern(PATTERNS.name).required(),
  email: Joi.string().pattern(PATTERNS.email).required(),
  phone: Joi.string().pattern(PATTERNS.phone).required(),
  favorite: Joi.boolean(),
})

const joiFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const Contact = model('contact', contactSchema)

module.exports = { Contact, joiContactSchema, joiFavoriteSchema }
