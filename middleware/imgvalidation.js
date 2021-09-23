async function imgValidation(req, res, next) {
    try {
        
        if (req.file) {
            
            if (req.file.size <= 255000) {
                if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpg') {
                    next()
                } else {
                    res.status(400).json({ message: "Incorrect File Type" })
                }
            } else {
                res.status(400).json({ message: "Uploaded File Exceeds Size Limit" })
            }
        } else {
            console.log('masuk')
            throw { name: "IMGEMPTY" }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = imgValidation