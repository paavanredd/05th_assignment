const express = require('express')
const bcrypt = require('bcryptjs')
const userModel = require('../models/user_schema')
//const authRole = require('../middlewares/admin_auth')
//const auth = require('../middlewares/login_auth')
const router = new express.Router()

//user registration
router.post('/create-user', async (req,res)=>{
    const user = new userModel(req.body)
    try {
        user.password = await bcrypt.hash(user.password, bcrypt.genSalt(8))
        await user.save().then((user) => {
            res.status(201).send(user)
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

//user login
router.get('/user/login', async(req,res)=>{ 
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if(!user){
            res.status(404).send('email or password are not matching from  the database')
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router