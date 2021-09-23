const { checkPass } = require('../helper/bcryptjs')
const { User } = require('../models')
const { jwtSign } = require('../helper/JWT')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GoogleId)

class UserController{

    static async register(req, res, next){
        const { firstName, lastName, email, password, phoneNumber } = req.body
        try {
            const createUser = await User.create({ firstName, lastName, email, password, phoneNumber })
            if (createUser) {
                res.status(201).json(createUser)
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

    // static async getUserData(req, res, next){}

    static async updateProfile(req, res, next){
        try {
            const id = req.user.id
            const {firstName, lastName, email, phoneNumber, address, province, city} = req.body
            
            let obj = { firstName, lastName, email, phoneNumber }

            if (address) {
                obj = {...obj, address}
            }
            if (province) {
                obj = {...obj, province}
            }
            if (city) {
                obj = {...obj, city}   
            }

            const updatedProfile = await User.update(obj, {
                where:{id}
            })
            if (updatedProfile) {
                res.status(201).json(updatedProfile)
            } else {
                throw {
                    name:"USERNOTFOUND"
                }
            }
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async googleAuth(req, res, next) {
        try {
            let idToken = req.body.idToken
            const tiket = await client.verifyIdToken({
                idToken,
                audience: process.env.GoogleId
            })
            const payload = tiket.getPayload()
            const result = await User.findOne({
                where: { email: payload.email }
            })
            if (result) {
                console.log('masuk if')
                const access_token = jwtSign({
                    id: result.id,
                    email: result.email,
                    role: result.role
                })
                res.status(200).json({ access_token })
            } else {
                console.log(payload)
                const regis = await User.create({
                    firstName: payload.given_name,
                    lastName: payload.family_name,
                    email: payload.email,
                    password: "dilarangmencontek",
                    role: "customer",
                    phoneNumber: payload.sub,
                })
                if (regis) {
                    const access_token = jwtSign({
                        id: regis.id,
                        email: regis.email,
                        role: regis.role
                    })
                    res.status(200).json({ access_token })
                }
            }
        } catch (err) {
            console.log(err)
            next(err)
        }

    }
}

module.exports = UserController