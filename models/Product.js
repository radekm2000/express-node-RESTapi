const mongoose = require('mongoose')


const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide products name']
    },
    price: {
        type: Number,
        required: [true, 'Please provide products price']
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        },
        required: [true, 'Please provide products company']

    },
    category: {
        type: String,
        enum: {
            values: ['general', 'home'],
            message: 'category must be -general or -home'
        },
        default: undefined
    },
    rating: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }    


})


module.exports = mongoose.model('Product', ProductSchema)