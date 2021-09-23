const axios = require('axios')
const FormData = require('form-data')

imageKit = async (req, res, next) => {
    
    try {
        if (!req.file) {
            throw { name: "IMGEMPTY" }
        }
        const newformData = new FormData()
        const encodedFile = req.file.buffer.toString("base64")// untuk menerjemahkan data buffer ke base 64
        newformData.append("file", encodedFile) // imagekit requirement
        newformData.append("fileName", req.file.originalname) // imagekit requirement
        const imgKey = Buffer.from(process.env.imageKitKey + ":").toString("base64")//":" agar tidak diminta password

        // console.log(encodedFile)// kepo

        // console.log(imgKey)
        const result = await axios({
            method: "POST",
            url: `${process.env.IMAGEURL}`,
            data: newformData,
            headers: { //gunakan huruf kecil
                ...newformData.getHeaders(),
                Authorization: `Basic ${imgKey}`
            }
        })
        if (result) {
            req.body.imgUrl = result.data.url
            next()
        } else {
            throw {
                name: "URLNOTFOUND"
            }
        }
    } catch (err) {
        next(err)
    }

}

module.exports = imageKit