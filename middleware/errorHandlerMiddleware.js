const {StatusCodes} = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong'
    }


    if(err.code && err.code === 11000) {
        customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
        customError.statusCode = 400;
    }

    if(err.name === 'ValidationError') {
        //object.values(err.errors).map() gives 2 items that are errors
        //for example password and email
        // and then they have property message which is from mongoose 
        // please provide password , email and we join it together and 
        // set status code to 400 because if we didnt handle it
        // it would be default 500 internal server error
        customError.message = Object.values(err.errors).map((item) => item.message).join(',')
        customError.statusCode = 400
    }
    //cast error is for example when we have tasks with id length 10
    // and we look for a task with random id length 14
    // then there is a cast error
    if(err.name === 'CastError') {
        customError.message = `No item found with id ${err.value}`
        customError.statusCode = 404
    }

    
    
    
    // return res.status(customError.statusCode).json({err}) <= this one is used to see the error and to
    // create handler like for cast error or validation error 
    return res.status(customError.statusCode).json({errors: [{message: customError.message}]})
}

module.exports = errorHandlerMiddleware