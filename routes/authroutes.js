const express = require('express')
const router = express.Router()
const {login, register, createNewToken} = require('../controllers/auth')

// POST and i think all methods give under the hood 3rd parameter except req and res and its next so 
// in ur function if u pass for example parameter it wont see it because it sees next so
// in router u have to pass anonymous function that passes req and res to the login
// and then in login 3rd parameter will be non existing so u can add your own
router.route('/login').post((req, res) => login(req, res))
router.route('/register').post(register)
router.route('/token').post((req, res) => createNewToken(req, res))


module.exports = router