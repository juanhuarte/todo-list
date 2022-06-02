const express = require('express')
const cors = require('cors')
require('dotenv').config()
const router = require('./routes')
require('./utils/conexion-db')
const fileupload = require('express-fileupload')

const app = express()

app.use(fileupload())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(express.static('userpics'))

app.use('/api', router)

app.listen(4000, () => console.log('Listening on port 4000'))
