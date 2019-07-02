const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setUpDatabase } = require('./fixtures/db')

beforeEach(setUpDatabase)

test('should signup a new user', async () => {
  const response = await request(app).post('/users').send({
        name:'kolaniyi',
        email:'kolniy@kola.com',
        password:'1234abcde'
    }).expect(201)

    // assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()


    //Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'kolaniyi',
            email: 'kolniy@kola.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('1234abcde')


})

test('should login existing user', async () => {
  const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)

    expect(user.tokens[1].token).toBe(response.body.token)
})

test('should not login a user with bad credentials', async () => {
    await request(app).post('/users/login').send({
        email:'somerandomguy@mail.com',
        password: 'withsomerandopassword'
    }).expect(400)
})

test('should get profile for user', async () => {
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('should not get profile for unauthenticated user', async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('should delete account for user', async () => {
   await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('should not delete account for unauthenticated user', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('should upload avatar image', async () => {
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/avatar1.jpg')
    .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name:'kolawole'
    })
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('kolawole')
})

test('should not update invalid user field', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location:'unknown'
    })
    .expect(400)
})

test('should not sign up user with invalid name', async () => {
    await request(app)
    .post('/users')
    .send({
        name:''
    })
    .expect(400)
})

test('should not sign up user with invalid email', async () => {
    await request(app)
    .post('/users')
    .send({
        email: 'majekinnoeoh'
    })
    .expect(400)
})

test('should not sign up user with invalid password', async () => {
    await request(app)
    .post('/users')
    .send({
       password: 'password'
    })
    .expect(400)
})

test('should not update user if not unauthenticated', async () => {
    await request(app)
    .patch('/users/me')
    .send({
        name:'kolawole',
        password:'bikonuu12345'
    })
    .expect(401)
})

test('should not update user with invalid name', async () => {
 await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: ''
    })
    .expect(400)
})

test('should not update user with invalid email', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        email: 'badexampleofemail.com'
    })
    .expect(400)
})

test('should not update user with invalid password', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
       password:'password'
    })
    .expect(400)
})

test('Should not delete user if unauthenticated', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})