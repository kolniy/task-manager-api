const express = require('express')
require('./db/mongoose')
const userRoute = require('./routers/users')
const taskRoute = require('./routers/tasks')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRoute)
app.use(taskRoute)

app.listen(port, () => {
    console.log(`App is up on port ${port}`)
})


