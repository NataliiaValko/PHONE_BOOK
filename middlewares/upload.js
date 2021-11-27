const multer = require('multer')
const path = require('path')
// const upload = multer({ dest: 'uploads/' })

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
}

const tempDir = path.join(__dirname, '../tmp')
const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: { fileSize: 4000 },
})

const fileFilter = (req, file, cb) => {
  MIME_TYPE_MAP[file.mimetype] ? cb(null, true) : cb(null, false)
}

const upload = multer({ storage: uploadConfig, fileFilter })

module.exports = upload
