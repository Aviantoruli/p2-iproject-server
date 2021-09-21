const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

let uploadImage = upload.single("imgUrl")

module.exports = uploadImage    
