const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user')

router.post('/sign-up', userControllers.signUp) // nuevo usuario
router.post('/sign-in', userControllers.signIn) // para login
router.patch('/:id', userControllers.updateById) // modificara un usuario por el id
router.delete('/:id', userControllers.deleteById) // borrara un usuario por el id

module.exports = router
