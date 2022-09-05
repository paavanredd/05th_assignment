const express = require('express')
const productModel = require('../models/product_schema')
const {adminAuth, staffAuth, managerAuth} = require('../middleware/user_auth')
const auth = require('../middleware/login_auth')
const router = new express.Router()

//create product
router.post('/product/create', auth, adminAuth, async (req,res)=>{
    const product = new productModel({...req.body})
    try {
        await product.save()
        res.status(201).send(product)
    } catch (error) {
        res.status(400).send(error)
    }
})

// read All products
router.get('/product/read', auth, [adminAuth,managerAuth], async(req,res)=>{
    try {
        const prodcut = await productModel.find({ name: req.user.name})
        res.status(200).send(prodcut)
    } catch (error) {
        res.status(404).send(error)
    }
})

//updating product details by using Id
router.patch('/product/:id', auth, [adminAuth,managerAuth], async(req,res)=>{
    const _id = req.params.id
    try {
        await productModel.updateOne({_id},req.body,{new: true, runValidators: true })
        const prodcut2 = await productModel.find({_id})
        res.status(200).send(prodcut2)
    } catch (error) {
        res.status(400).send(error)
    }
})

//delete prodcts using name
router.delete('/product/delete/:id', auth, adminAuth, async(req,res)=>{
    const _id = req.params.id
    try {
        const product = await productModel.deleteOne({_id})
        if(!product){
            return res.status(404).send('product  not found')
            }
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router