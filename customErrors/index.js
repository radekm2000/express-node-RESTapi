const CustomAPIError = require('./customAPIError')
const UnauthorizedError = require('./UnauthorizedError')
const BadRequestError = require('./badRequest')
const notfoundError = require('./notfoundError')

module.exports = {
    CustomAPIError,
    UnauthorizedError,
    notfoundError,
    BadRequestError
}

