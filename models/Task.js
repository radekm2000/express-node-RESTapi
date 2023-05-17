const mongoose = require('mongoose')


const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide title']    
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "please provide user"]
    },
    
}, {timestamps: true})



module.exports = mongoose.model('Task', TaskSchema)