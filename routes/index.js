const { Router } = require('express')
const { createNewUser, loginUser, getUsers } = require('../controllers/user')
const { validateUser, isLoggedIn } = require('../middleware/')
const router = Router()

router.post('/register', validateUser, createNewUser)
router.post('/login', validateUser, loginUser)
router.get('/users', isLoggedIn, getUsers)
module.exports = router