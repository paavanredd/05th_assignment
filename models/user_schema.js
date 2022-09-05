//modules
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Schema for user
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: Number,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.default.isMobilePhone(value)) {
                throw new Error('Phone number is invalid')
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Input Password cannot contain "password"')
            }
        }
    },
    role:{
        type: String,
        lowercase: true,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//Query user by email and password
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('email is not existing in the database')
    }
    const isMatch = await bcrypt.compare(password, admin.password)
    if(!isMatch){
        throw new Error('password is not matching')
    }
    return user
}

//generate JWT token
userSchema.methods.generateAuthtoken = async function(){
    const user = this
    const token = jwt.sign({_id: admin._id.toString()},'Soyft2022@sdsa343')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//bycrypt password updated
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User