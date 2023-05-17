const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')



const register = async(req, res) => {
    const user = await User.create(req.body)
    const token = user.createJWT()
        
        
    res.status(StatusCodes.CREATED).json({user, token})
}
const login = async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email: email})
    if(!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: 'Invalid credentials'})
    }
    const isPasswordCorrect = await user.comparePasswords(password)
    if(!isPasswordCorrect) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: 'Invalid password'})
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user, token})
}


module.exports = {
    login,
    register
}