const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/syoft-assignment', {useNewUrlParser: true}).then(()=>{
    console.log('connected to Zenwork database')
}).catch((error)=>{
    console.log(error)
})