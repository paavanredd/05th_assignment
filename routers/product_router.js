const express = require('express')
const productModel = require('../models/product_schema')
const auth = require('../middleware/login_auth')
const User = require('../models/user_schema')
const router = new express.Router()

//create product
router.post('/product/create', auth, async (req,res)=>{
    if(User.role === "admin") {
        const product = new productModel({...req.body})
        try {
            await product.save()
            res.status(201).send(product)
        }
        catch (error) {
            res.status(400).send(error)
        }
    } else {
        res.status(403).send("Access restricted")
    }
})

// read All products
router.get('/product/read', auth, [adminAuth,managerAuth], async(req,res)=>{
    if(User.role === "admin" || "manager") {
        try {
            const prodcut = await productModel.find({ name: req.prodcut.name})
            res.status(200).send(prodcut)
        } catch (error) {
            res.status(404).send(error)
        }
    } else {
        res.status(403).send("Access restricted")
    }
})

//updating product details by using Id
router.patch('/product/:id', auth, async(req,res)=>{
    const _id = req.params.id
    if(User.role === "admin" || "manager") {
        try {
            await productModel.updateOne({_id},req.body,{new: true, runValidators: true })
            const prodcut2 = await productModel.find({_id})
            res.status(200).send(prodcut2)
        } catch (error) {
            res.status(400).send(error)
        }
    }
})

//delete prodcts using name
router.delete('/product/delete/:id', auth, adminAuth, async(req,res)=>{
    const _id = req.params.id
    if(User.role === "admin" || "manager") {
        try {
            const product = await productModel.deleteOne({_id})
            if(!product){
                return res.status(404).send('product  not found')
            }
            res.status(200).send(product)
        } catch (error) {
            res.status(400).send(error)
        }
    }
})

module.exports = router