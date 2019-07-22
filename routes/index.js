const { Router } = require('express')
const { createNewUser, loginUser } = require('../controllers/user')
const { validateUser } = require('../middleware/')
const router = Router()

router.post('/users/register', validateUser, createNewUser)
router.post('/users/login', validateUser, loginUser)
module.exports = router