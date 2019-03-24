const User = require('../models/user')
const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelMail } = require('../emails/account')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        console.log(user.email)
        console.log(user.name)
        await user.save()
        const token = await user.generateAuthToken()
        sendWelcomeEmail(user.email, user.name)
        
        res.status(201).send({user, token})

    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login',  async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
        
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        console.log(req.token)
        console.log(req.user.tokens)
        req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }

})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []

        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/me', auth,  async (req, res) => {
    res.send(req.user)
})

const upload = multer({
    limits: {
        fileSize:1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('File must be image'))
        }
        cb(undefined, true)

        // cb(undefined, true)
        // cb(undefined, false)
        // cb(new Error('File must be image'))
    }
})


router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    //req.user.avatar = req.file.buffer
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()

    res.send()
    
} )

router.get('/users/:id/avatar', async (req, res) => {
    const user = await User.findById(req.params.id)
    try {
        if(!user || !user.avatar){
            throw new Error()
        }
        
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (error) {
        res.status(404).send()
        
    }
})



// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id
//     try {
//         const user = await User.findById(_id)
//         if(!user){
//             res.status(404).send()
//         }
//         res.send(user)

//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

router.patch('/users/me',auth,  async(req, res) => {
    const updates = Object.keys(req.body)
    const allowUpdated = ['name', 'email', 'password', 'age']
    const isValidOperator = updates.every((update) => allowUpdated.includes(update))
    if(!isValidOperator){
        res.status(400).send({'Error': 'Update invalid'})
    }

    try {
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    
    } catch (error) {

        console.log(error)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        
        await req.user.remove()
        sendCancelMail(req.user.email, req.user.name)
        res.send(req.user)
        
    } catch (error) {
        
        res.status(500).send(error)
    }
})

module.exports = router