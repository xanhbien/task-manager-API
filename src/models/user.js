const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./task')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        },
        trim: true,
        lowercase:true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("Password is invalid")
            }
        }

    },
    age: {
        type: Number,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        },
        default:0
    },
    tokens: [{
        token: {
            required:true,
            type: String
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps:true
})
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})



userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    
    if(!user){
        throw new Error("Unable to login - cant not find")
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error("Unable to login wrong password")
    }
    return user
}
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'xanhbien' )
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token

}

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
   // delete userObject.avatar

    return userObject
}

userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.pre('remove', async function (next) {
    const user = this
    console.log(user._id)
    await Task.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User