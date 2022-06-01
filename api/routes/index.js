const express = require('express')
const router = express.Router()
const userRoutes = require('./user')
const todoRoutes = require('./todo')
const { verifyToken } = require('../utils/verifyToken')

router.use('/user', userRoutes)
router.use('/todo', todoRoutes)
router.use('/verify-token', verifyToken, (req, res) => {
   res.json({
      success: true,
      data: {
         firstName: req.user.firstName,
         image: req.user.image,
      },
   })
})

module.exports = router
