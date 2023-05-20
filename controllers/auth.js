const jwt = require('jsonwebtoken')
const { UnauthorizedError, BadRequestError } = require('../customErrors')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const RefreshToken = require('../models/RefreshToken');
const NotFoundError = require('../customErrors/notfoundError');



const register = async(req, res) => {
    const user = await User.create(req.body)
    const token = user.createJWT()
    try {

    } catch (err) {
        // Log error
        res.status(400)
    }
    
    
    
    res.status(StatusCodes.CREATED).json({user, token})
}

const login = async(req, res, userRepository = User) => {
    
    // const {apikey} = req.headers
    // if(!apikey || apikey !== 'witekhuj') {
    //     throw new UnauthorizedError(`please provide correct apikey`)
    // }
    const {email, password} = req.body
    if(email === "" || password === "") {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await userRepository.findOne({email: email})
    if(!user) {
        // return res.status(StatusCodes.UNAUTHORIZED).json({msg: 'Invalid credentials'})
        throw new UnauthorizedError('Invalid credentials')
    }
    const isPasswordCorrect = await user.comparePasswords(password)
    if(!isPasswordCorrect) {
        // return res.status(StatusCodes.UNAUTHORIZED).json({msg: 'Invalid password'})
        throw new UnauthorizedError('Invalid password')
    }
    const token = user.createJWT()
    const refreshToken = user.createRefreshJWT()
    // ----------------creating refresh token and saving it to database
    // const refreshToken = user.createRefreshJWT();
    //     const refreshTokenToDB = await RefreshToken.create({
    //     token: refreshToken,
    //     user: user._id,
    //     createdAt: Date.now(),
    //     expiresIn : process.env.JWT_REFRESH_LIFETIME
    // })
    // await refreshTokenToDB.save()
    
    
    res
    .status(StatusCodes.OK)
    .json({user, accessToken: token, refreshToken: refreshToken})
    
}



//creates new acces token on base of refresh token
const createNewToken = async(req, res,) => {
    const refreshToken = req.header('x-auth-token')
    if(!refreshToken) {
        throw new NotFoundError('Token not found in header')
    }

    try {
        const payload = await jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const {userId} = payload
        
        const accessToken = await jwt.sign({userId: userId}, process.env.JWT_SECRET, {expiresIn: "5m"})
        res.json({accessToken : accessToken})
    } catch (error) {
        throw new BadRequestError('invalid token kekw')
    }

}






module.exports = {
    login,
    register,
    createNewToken
}