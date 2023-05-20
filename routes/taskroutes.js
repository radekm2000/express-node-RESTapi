const express = require('express')
const router = express.Router();

const {getAllTasks, getSingleTask, createTask, updateTask, deleteTask} = require('../controllers/tasks')


router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get((req, res) => getSingleTask(req, res)).patch((req, res) => updateTask(req,res)).delete((req, res) => deleteTask(req, res))




module.exports = router