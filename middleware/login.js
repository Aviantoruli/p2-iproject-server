const { verifyToken } = require('../helpers/JWT')
const { User, Post } = require('../models')

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
            req.user = { id: userCheck.id, role: userCheck.role, email: userCheck.email }
            next()
        }
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const autho = async (req, res, next) => {
    const postId = req.params.id
    const { id, role } = req.user
    console.log('masuk autho')
    try {
        if (role === "admin") {
            next()
        } else {
            const result = await Post.findByPk(postId)
            if (!result) {
                throw {
                    name: "POSTNOTFOUND"
                }
            }
            if (result.AuthorId === id) {
                next()
            } else {
                throw {
                    name: "FORBIDDEN"
                }
            }
        }
    } catch (err) {
        next(err)
    }

}

const adminValid = async (req, res, next) => {
    const postId = req.params.id
    const { id, role } = req.user
    try {
        if (role === "admin") {
            next()
        } else {
            throw {
                name: "FORBIDDEN"
            }
        }
    } catch (err) {
        next(err)
    }

}

const customerValid = async (req, res, next)=>{
    const {id, role} = req.user
    try {
        if (role === "customer") {
            next()
        } else {
            throw {
                name: "FORBIDDEN"
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { authe, autho, adminValid, customerValid }
