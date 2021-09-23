const jwt = require('jsonwebtoken')
const JWT_Secret = process.env.SECRET

function jwtSign(payload) {
   return jwt.sign(payload, JWT_Secret);
}

function verifyToken(token) {
   return jwt.verify(token, JWT_Secret)
}

module.exports = { jwtSign, verifyToken }