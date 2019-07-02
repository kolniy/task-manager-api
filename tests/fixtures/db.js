const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: 'jdfkj921983!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Captain K',
    email: 'CaptainK@example.com',
    password: 'captain21983!!',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'first task',
    completed: true,
    owner: userOne._id
}

const taskTwo = {
    _id : new mongoose.Types.ObjectId(),
    description: 'second task',
    completed: false,
    owner: userOne._id
}

const taskThree = {
    _id : new mongoose.Types.ObjectId(),
    description: 'third task',
    completed: true,
    owner: userTwo._id
}

// const taskFour = {
//     _id : new mongoose.Types.ObjectId(),
//     description: 'fourth task',
//     completed: true,
//     owner: userOne._id
// }

// const taskFive = {
//     _id : new mongoose.Types.ObjectId(),
//     description: 'fifth task',
//     completed: true,
//     owner: userOne._id
// }

const setUpDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setUpDatabase
}