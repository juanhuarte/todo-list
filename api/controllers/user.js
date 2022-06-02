const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')

module.exports = {
   signUp: async (req, res) => {
      const { firstName, username, password } = req.body
      const { image } = req.files
      const hashedPassword = bcrypt.hashSync(password, 10)
      try {
         const userExists = await User.findOne({ username })
         if (userExists) throw new Error('El usuario ya existe!')
         const newUser = new User({
            firstName,
            username,
            password: hashedPassword,
         })
         const extension = image.name.split('.').pop()
         const newFileName = `${newUser._id}.${extension}`
         const rutaArchivo = path.join(__dirname, '..', 'userpics', newFileName)
         newUser.image = `http://localhost:4000/${newFileName}`

         // GRABAR EL ARCHIVO QUE RECIBI EN REQ.FILES
         image.mv(rutaArchivo, async (err) => {
            if (err) throw new Error(err)
            await newUser.save()
            res.status(201).json({
               success: true,
               data: {
                  _id: newUser._id,
                  firstName,
                  username,
                  image: newUser.image,
               },
            })
         })
      } catch (e) {
         res.json({ success: false, error: e.message })
      }
   },

   signIn: async (req, res) => {
      const { username, password } = req.body
      try {
         const userExists = await User.findOne({ username })
         if (!userExists) throw new Error('Usuario incorrecto')
         const passwordMatches = bcrypt.compareSync(
            password,
            userExists.password
         )
         if (!passwordMatches) throw new Error('Contraseña incorrecta')
         const token = jwt.sign(
            {
               ...userExists,
            },
            process.env.SECRET_OR_KEY
         )
         res.status(200).json({
            success: true,
            data: { firstName: userExists.firstName, image: userExists.image },
            token,
         })
      } catch (e) {
         res.json({ success: false, error: e.message })
      }
   },

   updateById: (req, res) => {},

   deleteById: async (req, res) => {
      const { user } = req
      try {
         let respuesta = await User.findByIdAndDelete(user._id)
         if (!respuesta) throw new Error('No borré nada...')
         res.json({ success: true, response: 'User deleted' })
      } catch (e) {
         res.json({ success: false, response: e.message })
      }
   },
}
