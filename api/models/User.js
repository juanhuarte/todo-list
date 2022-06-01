const mongoose = require('mongoose')

const schema = new mongoose.Schema({
   firstName: { type: String, required: true },
   username: { type: String, required: true },
   password: { type: String, required: true },
   image: { type: String, required: true },
})

const User = mongoose.model('user', schema)

module.exports = User
