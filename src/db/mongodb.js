//CRUD create, read, update, delete
//Start mongo: /Volumes/Projects/NODEJS/mongodb/bin/mongod --dbpath=/Volumes/Projects/NODEJS/mongodb
//document: http://mongodb.github.io/node-mongodb-native/3.1/api/
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

//const id = new ObjectID()

// console.log(id.id.length)
// console.log(id.getTimestamp())
// console.log(id.toHexString().length)


MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error, client) => {
    if(error){
       return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)



// db.collection('users').deleteMany({
//     age: 33
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

// db.collection('users').deleteOne({_id: new ObjectID("5c91e9ead94670053fa4ea67")})
// .then((result) => {
//     console.log(result)

// }).catch((error) => {
//     console.log(error)
// })


// db.collection('task').updateMany({
//     completed: false
// }, {
//     $set :  {
//         completed:true
//     }
// }).then((result) => {
//     console.log(result)

// }).catch((error) => {
//     console.log(error)

// })


// db.collection('users').updateOne({_id: new ObjectID("5c91e4df22288a04d557d0d9")}, {
//     $inc: {
//         age: 55
//     }
// }).then((result) => {
//     console.log(result)

// }).catch((error) => {
//     console.log(error)

// })




z
// db.collection('task').findOne({_id: ObjectID("5c91e66daa170704f07a2f14")}, (error, result) => {
//     console.log(result)
// })


// db.collection('task').find({completed:true}).toArray((error, tasks) => {
//     console.log(tasks)
// })

// db.collection('task').count((error, count) => {
//     console.log(count)
// })


// db.collection('users').findOne({_id: new ObjectID("5c91e9ead94670053fa4ea67")}, (error, result) => {
//     if(error){
//         return 'Unable to fetch data'
//     }

//     console.log(result)

// })
// db.collection('users').insertOne({
//     _id: id,
//     name: 'Chim Xinh',
//     age: 32
// }, (error, result) => {
//     if(error){
//         return console.log("Unable to insert user")
//     }

//     console.log(result.ops)
// })

// db.collection('users').insertMany([{
//     name: 'Jen',
//     age: 28
// }, {
//     name: 'John',
//     age: 40
// }], (error, result) => {

//     if(error){
//         return console.log('Unable to inert many users')
//     }

//     console.log(result.ops)

// })


// db.collection('task').insertMany([{
//     description: "Learn english",
//     completed: true
// }, {
//     description: "Clean the floor",
//     completed: false
// },
// {
//   description: "Calculate salary",
//   completed: true  
// }], (error, result) => {
//     if(error){
//         return console.log("Unable to insert into documents")
//     }

//     console.log(result.ops)
// })


})
