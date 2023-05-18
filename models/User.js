const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxLength: 30
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please provide valid email'],
        unique: true        
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minLength: 4
    }

})


UserSchema.pre('save', async function() {  
    this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id, name: this.name},
    process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.createRefreshJWT = function() {
    return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.JWT_REFRESH_LIFETIME})
}

UserSchema.methods.comparePasswords = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}



module.exports = mongoose.model('User', UserSchema)

