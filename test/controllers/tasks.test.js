const chai = require('chai')
const expect = require('chai').expect
let chaiHttp = require('chai-http')
chai.use(chaiHttp)
const Sinon = require('sinon')
const BadRequestError = require('../../customErrors/badRequest')
const UnauthorizedError = require('../../customErrors/UnauthorizedError')
const { StatusCodes } = require('http-status-codes')
const NotFoundError = require('../../customErrors/notfoundError')
const Task = require('../../models/Task')
const {getSingleTask, updateTask, deleteTask} = require('../../controllers/tasks')
const CastError = require('mongoose').Error.CastError;
const { Error } = require('mongoose');

describe(' single task modification', async() => {



    it('throws an error if there is no task with input ID', async() => {
        //given
        const request = {
            params: {
                id: 123
            },
            user: {
                userId: 123
            }
        } 
        const {user: {userId}, params: {id: taskId}} = request
        

        const taskRepositoryMock = {
            findOne: async () => undefined
        }
        //then

        await expectAsyncErrorWithMessage(async() => getSingleTask(request, {}, taskRepositoryMock),NotFoundError, `There is no task with id ${taskId}`)
    })


    it('throws an error if fields to update task are empty ', async() => {
        //given
        const request = {
            body: {
                title: "",
                completed: ""
            },
            params: {
                id:  123
            },
            user: {
                userId: 123
            }
        }

        //then

        await expectAsyncErrorWithMessage(async() => updateTask(request, {}),BadRequestError, "fields to update cant be empty")
    })


    it('throws an error if task to delete has invalid ID ', async() => {
        //given
        const request = {
            
            params: {
                id: '64660d76ee2112d9cd5047a5'
            },
            user: {
                userId: "6466000c25e7c1bb9d34e2c7"
            }
        }
        const {user: {userId}, params: {id: taskId}} = request
        
        
        
        const taskRepositoryMock = {
            findOneAndDelete: async () => undefined
        }
            
        //then

        await expectAsyncErrorWithMessage(async() => deleteTask(request, {}, taskRepositoryMock),NotFoundError, `There is no task with id ${taskId}`)
        
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

