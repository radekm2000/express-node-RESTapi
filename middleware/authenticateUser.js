require('dotenv').config()
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const authenticateUser = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: "No token provided"})
    }
    const token = authHeader.split(" ")[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId, name: payload.name}
        
        next()
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Invalid token"})
    }
   

}

module.exports = authenticateUser