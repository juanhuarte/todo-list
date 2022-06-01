const mongoose = require('mongoose')

const schema = new mongoose.Schema({
   firstName: { type: String, required: true },
   username: { type: String, required: true },
   password: { type: String, required: true },
   image: { type: String, required: true, default: 'https://www.telam.com.ar/thumbs/bluesteel/advf/imagenes/2022/05/62819f29a8ebd_900.jpg' },
})

const User = mongoose.model('user', schema)

module.exports = User
