const request = require('supertest')
const app       = require('../src/app')
const Task    = require('../src/models/task')
const {userOne, userOneId, setupDatabase} = require('./fixtures/db')
beforeEach(setupDatabase)

test('Add new task', async () => {
    const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: 'Do some thing like test'
    })
    .expect(201)

    const taskId = Task.findById(response.body._id)
    expect(taskId).not.toBeNull()
})