const fs = require('fs/promises')
const Jimp = require('jimp')
const path = require('path')
const { User } = require('../../models')
const { getNotFoundId, UnsupportedMediaType } = require('http-errors')
const { sendSuccessToRes } = require('../../helpers')

const avatarsDir = path.join(__dirname, '../../public/avatars')

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return next(UnsupportedMediaType('Error loading file'))
  }

  const { path: tmpUpload, originalname } = req.file
  try {
    const { _id } = req.user
    const fileName = `${String(_id)}_${originalname}`
    const resultUpload = path.join(avatarsDir, String(_id), fileName)
    await fs.rename(tmpUpload, resultUpload)
    const avatarURL = path.join('/avatars', String(_id), fileName)
    const file = await Jimp.read(resultUpload)
    file.resize(250, 250).write(resultUpload)

    const result = await User.findByIdAndUpdate(
      _id,
      { avatarURL },
      { new: true }
    )

    return result
      ? sendSuccessToRes(res, { avatarURL })
      : next(getNotFoundId(_id))
  } catch (error) {
    await fs.unlink(tmpUpload)
    return next(error)
  }
}

module.exports = updateAvatar
