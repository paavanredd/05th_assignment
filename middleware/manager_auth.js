const jwt = require('jsonwebtoken')
const User = require('../models/user_schema')

const managerAuth = async (req,res,next) =>{
    const token = req.header('Authorization').replace('Bearer ','')
    const decoded = jwt.verify(token, 'Soyft2022@sdsa343')
    const user = await User.findOne({_id:decoded._id, 'tokens.token': token})
    if(!user){
        throw new Error()
    }

    req.token = token
    req.user = user
    
    if (req.user.role !== 'manager') {
        res.status(401)
        return res.send('Not allowed')
    }
    
    next()
}

module.exports = managerAuth