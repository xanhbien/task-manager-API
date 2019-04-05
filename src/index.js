const app = require('./app')
const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is up on port ' + port)

})


// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req, file, cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             cb(new Error('File must be World document'))
//         }

//         cb(undefined, true)
//         // cb(undefined, false)
//         // cb(new Error('File must be PDF'))
//     }
// })

// app.post('/upload',upload.single('upload'), (req, res) => {

//     res.send()
// })



// const main = async () => {
//     const task = await Task.findById('5c94efd8cfa559049dae1200')
//     await task.populate('owner').execPopulate()
//     console.log(task.owner)
// }
// //main()

// const main2 = async () => {
//     const user = await User.findById('5c9509184434b80687f89422')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// main2()

