const { checkPass } = require('../helper/bcryptjs')
const { User } = require('../models')
const { jwtSign } = require('../helper/JWT')
// const { OAuth2Client } = require('google-auth-library')
// const client = new OAuth2Client(process.env.GoogleId)

class UserController{

    static async register(req, res, next){
        const { firstName, lastName, email, password, phoneNumber } = req.body
        try {
            const createUser = await User.create({ firstName, lastName, email, password, role, phoneNumber, address })
            if (newCutomer) {
                res.status(201).json(newCutomer)
            } else {
                throw { name: "SequelizeValidationError" }
            }
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body
        try {
            const userLogin = await User.findOne({ where: { email } })
            if (userLogin) {
                let checkPassword = checkPass(password, userLogin.password)
                if (checkPassword) {
                    const access_token = jwtSign({
                        id: userLogin.id,
                        email: userLogin.email,
                        role: userLogin.role
                    })
                    res.status(200).json({ img:userLogin.imgUrl, name:userLogin.firstName ,access_token })
                } else {
                    throw {
                        name: "USERNOTFOUND"
                    }
                }
            } else {
                throw {
                    name: "USERNOTFOUND"
                }
            }
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = UserController