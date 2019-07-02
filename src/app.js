const express = require('express')
require('./db/mongoose')
const userRoute = require('./routers/users')
const taskRoute = require('./routers/tasks')

const app = express()

app.use(express.json())
app.use(userRoute)
app.use(taskRoute)

module.exports = app


