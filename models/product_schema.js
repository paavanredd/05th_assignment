const mongoose= require('mongoose')

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true,
        lowercase: true
    },
    productPrice:{
        type: Number,
        required: true
    },
    productDescription:{
        type: String,
        required: true
    },
    productCount : {
        type : Number,
        default : 0,
        required : true
    }
})

const prodcuts = mongoose.model('Product', productSchema)
module.exports = prodcuts