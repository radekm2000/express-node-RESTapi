
const { BadRequestError } = require('../customErrors')
const NotFoundError = require('../customErrors/notfoundError')
const Task = require('../models/Task')
const {StatusCodes} = require('http-status-codes')
const getAllTasks = async(req, res) => {
    const {userId} = req.user
    const {select} = req.query
    
    let result = await Task.find({createdBy: userId })
    if(select) {
        result =  Task.find({createdBy: userId}).select(select)
        
    }
    
    tasks = await result
    res.status(StatusCodes.OK).json({tasks, count: tasks.length})
}
const getSingleTask = async(req, res) => {

    const {user: {userId}, params: {id: taskId}} = req
    
    const task = await Task.findOne({_id: taskId, createdBy: userId})
    if(!task) {
        throw new NotFoundError(`There is no task with id ${taskId}`)
        // return res.status(StatusCodes.NOT_FOUND).json({msg: `There is no task with id ${taskId}`})
    }

    res.status(StatusCodes.OK).json({task})
}
const createTask = async(req, res) => {
    const task = await Task.create(req.body)
    res.status(StatusCodes.CREATED).json({task})


}
const updateTask = async(req, res) => {
    const {user: {userId}, params: {id: taskId}} = req
    const {title, completed} = req.body
    if(title === "" || completed === "") {
        throw new BadRequestError('fields to update cant be empty')
        // res.status(StatusCodes.BAD_REQUEST).json({msg: "fields to update cant be empty"})
    }
    let task = await Task.findOneAndUpdate({_id: taskId, createdBy: userId}, req.body, {new: true, runValidators: true})
    
    
    res.status(StatusCodes.OK).json({msg: "You succesfuly updated task", task})
}
const deleteTask = async(req, res) => {
    const {user: {userId}, params: {id: taskId}} = req
    const task = await Task.findOneAndDelete({_id: taskId, createdBy: userId})
    if(!task) {
        throw new NotFoundError(`There is no task with id ${taskId}`)
    }
    res.status(StatusCodes.OK).json({msg: `Task with id ${taskId} has been deleted`})
}

module.exports = {
    getAllTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask
}