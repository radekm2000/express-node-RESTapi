const express = require('express')
const router = express.Router()
const {login, register, createNewToken} = require('../controllers/auth')



router.route('/login').post(login)
router.route('/register').post(register)
router.route('/token').post(createNewToken)


module.exports = router