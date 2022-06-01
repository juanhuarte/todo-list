const express = require('express')
const cors = require('cors')
require('dotenv').config()
const router = require('./routes')
require('./utils/conexion-db')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', router)

app.listen(4000, () => console.log('Listening on port 4000'))
