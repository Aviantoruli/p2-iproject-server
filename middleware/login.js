const { verifyToken } = require('../helper/JWT')
const { User } = require('../models')

const authe = async (req, res, next) => {///oke
    const token = req.headers.access_token

    try {

    if (!token) {
        throw{
            name:'TOKENINVALID'
        }
    }
        const payload = verifyToken(token)
        const userCheck = await User.findOne({
            where: {
                id: payload.id,
                email: payload.email
            }
        })
        if (!userCheck) {
            throw {
                name: 'TOKENINVALID'
            }
        } else {
            req.user = { id: userCheck.id, firstName: userCheck.firstName, lastName: userCheck.lastName, email: userCheck.email, phoneNumber: userCheck.phoneNumber}
            next()
        }
    } catch (err) {
        console.log(err)
        next(err)
    }
}


module.exports = { authe }
