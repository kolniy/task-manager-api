const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { 
    userOneId, 
    userOne, 
    userTwoId, 
    userTwo,
    taskOne,
    taskTwo,
    taskThree, 
    setUpDatabase 
} = require('./fixtures/db')

beforeEach(setUpDatabase)

test('should create task for user', async () => {
    const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description : 'From the test'
    })
    .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
    expect(task.owner).toEqual(userOneId)
})


test('request all task for user one', async () => {
   const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    
    const tasks = response.body
    expect(tasks.length).toEqual(2)
})

test('user two cannot delete task created by user one', async () => {

    await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})

test('should not create task with invalid description', async () => {
    await request(app)
    .post('/post')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description:''
    })
    .expect(404)
})

test('should not create task with invalid completed', async () => {
    await request(app)
    .post('/post')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        completed: 'jksdlkdnvl'
    })
    .expect(404)
})

test('should not update task with invalid description', async () => {
    await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        completed:''
    })
    .expect(400)
})

test('should not update task with invalid completed', async () => {
    await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        completed:'sdkvlmvlkm'
    })
    .expect(400)
})

test('should delete user task', async () => {
    await request(app)
    .delete(`/tasks/${taskTwo._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const task = await Task.findById(taskTwo._id)
    expect(task).toBeNull()
    // expect(task).toBeNull()
})

test('should not delete task if unauthenticated', async () => {
    await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .send()
    .expect(401)
})

test('should not update other users task', async () => {
    await request(app)
    .patch(`/tasks/${taskThree._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description:'some new task',
        completed: true
    })
    .expect(404)

    const task = await Task.findById(taskThree._id)
    expect(task.description).not.toEqual('some new task')
})

test('should fetch user task by id', async () => {
   const response = await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    
    const task = response.body
    expect(task).not.toBeNull()
})

test('should not fetch user task by id if unathenticated', async () => {
    const response = await request(app)
     .get(`/tasks/${taskOne._id}`)
     .send()
     .expect(401)
 })

test('should not fetch other users task by id', async () => {
    await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)
})

test('should fetch only completed task', async () => {
  const response = await request(app)
    .get('/tasks?completed=true')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const tasks = response.body
    expect(tasks).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                completed:true
            })
        ])
    )
})

test('should fetch only incompleted task', async () => {
    const response = await request(app)
      .get('/tasks?completed=false')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200)
  
      const tasks = response.body
      expect(tasks).toEqual(
          expect.arrayContaining([
              expect.objectContaining({
                  completed:false
              })
          ])
      )
  })

//   test('should sort task by description', async () => {
//      const response = await request(app)
//         .get('/tasks?description=asc')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .send()
//         .expect(200)

//         const tasks = response.body
//         let arrayToCompare = [taskOne,taskTwo,taskThree]
//         expect(tasks).toEqual(
//             expect.arrayContaining(arrayToCompare)
//         )
//   })
  
//   test('should sort task by completed', async () => {
      
//   })

//   test('should sort task by createdAt', async () => {
      
//   })

//   test('should sort task by updatedAt', async () => {
      
//    })