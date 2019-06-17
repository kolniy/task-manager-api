const mongoose = require('mongoose')

const mongoosedb = process.env.MONGODB_URL

mongoose.connect(mongoosedb , {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify: false
})

