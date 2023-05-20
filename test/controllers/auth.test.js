const chai = require('chai')
const expect = require('chai').expect
let chaiHttp = require('chai-http')
chai.use(chaiHttp)
const {register, login, createNewToken} = require('../../controllers/auth')
const User = require('../../models/User')
const Sinon = require('sinon')

const BadRequestError = require('../../customErrors/badRequest')
const UnauthorizedError = require('../../customErrors/UnauthorizedError')
const { StatusCodes } = require('http-status-codes')
const NotFoundError = require('../../customErrors/notfoundError')
const { notfoundError } = require('../../customErrors')

let user = {
    email: 'radek@gmail.com',
    name: 'radek',
    password: '1234'
}
const response = {
    status: 201,
    send: 'created'
}






// describe('testing register authorization', () => {

//     it('should send a status code of 400 when user exists', async() => {
//         // Given
//         const userMock = {
//             create: async () => {throw new Error()},
//         }
        
//         // When
//         await register(req, response);

//         // Then
//         expect(response).to.have.status(400);
//     })
// })

describe('login', () => {
    it('should throw an error if user email is blank', async () => {
        // Given
        const request = {
            body: {
                email: ''
            }
        }

        // Then
        await expectAsyncErrorWithMessage(async () => await login(request, {}), BadRequestError, 'Please provide email and password')
    })
    

    // -------------------------------------------------------- probne pisanie testu
    // it('should send response and status if everything is ok', async() => {
    //     //given
    //     const request = {
    //         body: {
    //             email : 'chuj@gmail.com',
    //             password: 'chuj'
    //         }
    //     }

    //     const usrMock = {
    //         createJWT: () => 'acstoken',
    //         createRefreshJWT: () => 'rfshtoken',
    //         comparePasswords: () => true
    //     }
    //     const usrRepostMock = {
    //         findOne: () => usrMock
    //     }

    //     const response = {
    //         status: (status) => { 
    //             return response // we have to return response
    //             // otherwise chaining wouldnt work
    //             // response.status.json // json would chain to undefined
    //             // bcs status wouldnt return response
    //         },
    //         json: (obj) => {
    //             return response
            
    //         } 
                
    //     }
    //     const statMeth = sinon.spy(response, 'status')
    //     const jsonMeth = sinon.spy(response, 'json')
        
    //     //then

    //     await(login(request, response, usrRepostMock))

    //     expect(statMeth(callCount)).to.be.equal(1)
    //     expect(jsonMeth(callCount)).to.be.equal(1)
    //     expect(statMeth.args[0][0]).to.be.equal(StatusCodes.OK)
    //     expect(jsonMeth.args[0][0]).to.be.deep.equal({
    //         user: usrMock, accessToken: 'acs-token', refreshToken : 'rfsh-token'
    //     })
    
    // })
// ---------------------------------------------------------------------------- koniec probnego pisania testu

    it('should throw an error if user password is blank', async () => {
        // Given
        const request = {
            body: {
                email: 'sample@mail.com',
                password: '',
            }
        }

        // Then
        await expectAsyncErrorWithMessage(async () => await login(request, {}), BadRequestError, 'Please provide email and password')
    })

    it('should throw an error if user is not found in the database', async () => {
        // Given
        const request = {
            body: {
                email: 'sample@mail.com',
                password: 'password',
            }
        }

        const userRepositoryMock = {
            findOne: async () => undefined
        }

        // Then
        await expectAsyncErrorWithMessage(async () => await login(request, {}, userRepositoryMock), UnauthorizedError, 'Invalid credentials')
    })

    it('should throw an error if given password is invalid', async () => {
        // Given
        const request = {
            body: {
                email: 'sample@mail.com',
                password: 'password',
            }
        }

        const userMock = {
            comparePasswords: async () => false
        }

        const userRepositoryMock = {
            findOne: async () => userMock
        }

        // Then
        await expectAsyncErrorWithMessage(async () => await login(request, {}, userRepositoryMock), UnauthorizedError, 'Invalid password')
    })

    it('should return correct response for a valid request', async () => {
        // Given
        const request = {
            body: {
                email: 'sample@mail.com',
                password: 'password',
            }
        }

        const userMock = {
            comparePasswords: async () => true,
            createJWT: () => 'jwt-token',
            createRefreshJWT: () => 'refresh-token',
        }

        const userRepositoryMock = {
            findOne: async () => userMock
        }

        const response = {
            status: (status) => {
                return response
            },
            json: (obj) => {
                return response
            }
        }

        const statusMethod = Sinon.spy(response, 'status')
        const jsonMethod = Sinon.spy(response, 'json')

        // When
        await login(request, response, userRepositoryMock)

        // Then
        expect(statusMethod.callCount).to.be.equal(1)
        expect(statusMethod.args[0][0]).to.be.equal(StatusCodes.OK)
        expect(jsonMethod.callCount).to.be.equal(1)
        expect(jsonMethod.args[0][0]).to.be.deep.equal({
            user: userMock,
            accessToken: 'jwt-token',
            refreshToken: 'refresh-token',
        })
    })
})

const expectAsyncErrorWithMessage = async (fn, errorType, message) => {
    return expectAsyncError(fn, errorType, (err) => {
        expect(err.message).to.be.equal(message)
    })
}

const expectAsyncError = async (fn, errorType, assertionFn) => {
    try {
        await fn()
    } catch (err) {
        if (err instanceof chai.AssertionError) {
            throw err
        }

        expect(err).is.instanceOf(errorType)
        assertionFn(err)
    }
}





describe('creating new access token on base of refresh token', () => {


    it('throws an error if refreshToken not found in header', async() => {

        //given 
        const refreshTokenMock = ''
        const request = {
            headers: {
                'x-auth-token' : refreshTokenMock
            },
            header: (headerName) => {
                return request.headers[headerName]
            }
        
        }

    // then

    await expectAsyncErrorWithMessage(async () => createNewToken(request,{}), NotFoundError, 'Token not found in header')

    })



    


})