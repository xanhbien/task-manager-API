const request   = require('supertest')
const app       = require('../src/app')
const User      = require('../src/models/user')
const {userOne, userOneId, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
   const response =  await request(app).post('/users').send({
        name: "Xanh Bien",
        email: "info@yeutre.vn",
        password: "Xanhbien124",
        age: 30
    }).expect(201)

    //Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Xanh Bien',
            email: 'info@yeutre.vn'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('Xanhbien124')

    
})


test('Should login existing user', async () => {
   const response =  await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)

    expect(user.tokens[1].token).toBe(response.body.token)
})

test('Should not login nonexistent user', async () => {

    await request(app).post('/users/login').send({
        email: "nonexistent",
        password: "NoneEXISTENT"
    }).expect(400)
})

test('Should view user profile', async () => {
    await request(app)
    .get('/users/me')
    .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
    .send()
    .expect(200)
})

test('Should can not view user profile', async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})


test('Should delete user', async () => {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()

})

test('Should can not delete user', async () => {
    request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

// afterEach(() => {
//     console.log('after Each')
// })

test('Should upload avatar image', async () => {
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))


})

test('Should update valid user field', async () => {

    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'Has changed'
    })
    .expect(200)

    const user = await User.findById(userOneId)

    expect(user.name).toEqual('Has changed')
    
})


test('Should not update invalid user field', async () => {

    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location: 'hcm'
    })
    .expect(400)
})