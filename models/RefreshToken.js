const mongoose = require('mongoose')

const RefreshTokenSchema = mongoose.Schema({
    token: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user for token']
    },
    createdAt: {
        type: Number
    },
    expiresIn : {
        type: String
    }
    

})

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema)


