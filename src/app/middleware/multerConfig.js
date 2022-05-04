const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/imgProduct')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
      cb(null, uniqueSuffix)
    }
  })
  
const upload = multer({ 
      storage: storage,
      limit: {fileSize: 1000000 * 100},
    })
module.exports = upload
