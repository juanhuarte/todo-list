const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user')
const { verifyToken } = require('../utils/verifyToken')

router.post('/sign-up', userControllers.signUp) // nuevo usuario
router.post('/sign-in', userControllers.signIn) // para login
router.patch('/:_id', userControllers.updateById) // modificara un usuario por el id
router.delete('/', verifyToken, userControllers.deleteById) // borrara un usuario por el id

module.exports = router
