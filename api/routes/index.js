const express = require('express')
const router = express.Router()
const userRoutes = require('./user')
const todoRoutes = require('./todo')
const { verifyToken } = require('../utils/verifyToken')
const path = require('path')

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
router.get('/foto/:nombre', (req, res) => {
   const rutaArchivo = path.join(__dirname, '..', 'userpics', req.params.nombre)
   res.download(rutaArchivo)
})

module.exports = router
