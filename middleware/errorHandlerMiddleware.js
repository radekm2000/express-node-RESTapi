const {StatusCodes} = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

    const errStatus = err.statusCode || 500
    const errMsg = err.message || 'something went wrong'
    //handling duplicate errors
    if(err.code === 11000) {
        const duplicatedKey = Object.keys(err.keyValue)[0]
        const duplicatedValue = err.keyValue[duplicatedKey]
        return res.status(StatusCodes.CONFLICT).json({msg: `${duplicatedKey} "${duplicatedValue}" has already been taken, it must be unique`})
    
    }
    return res.status(errStatus).json({errMsg})
}

module.exports = errorHandlerMiddleware