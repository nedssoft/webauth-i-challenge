const { Router } = require('express')
const { createNewUser } = require('../controllers/user')
const { validateUser } = require('../middleware/')
const router = Router()

router.post('/users', validateUser, createNewUser)
module.exports = router