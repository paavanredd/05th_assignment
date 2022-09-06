const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/syoft-assignment', {useNewUrlParser: true}).then(()=>{
    console.log('connected to syoft database')
}).catch((error)=>{
    console.log(error)
})
