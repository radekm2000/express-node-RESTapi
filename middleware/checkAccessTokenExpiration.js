const jwt = require('jsonwebtoken')
const RefreshTokenFromDB = require('../models/RefreshToken')
const NotFoundError = require('../customErrors/notfoundError')
require('dotenv').config()
const checkAccessTokenExpiration = async(req, res, next) => {
    const authHeader = req.headers.authorization
    const accessToken = authHeader.split(" ")[1]
    const currentTime = Date.now() / 1000
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
    const {exp,userId} = payload;
    // console.log(payload)
    // console.log(accessToken)
    console.log(currentTime)
    console.log(payload)
    
        if(exp > currentTime) { 
            const refreshToken = await RefreshTokenFromDB.findOne({userId: userId})
            const newAccessToken = jwt.sign({user: userId}, process.env.JWT_SECRET, {expiresIn: '30s'})
            req.headers.authorization = newAccessToken
            next()
        if(err) {
            return res.status(404).json('not found')
        }

    }
}
module.exports = checkAccessTokenExpiration