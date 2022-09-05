const express = require('express')
const products = require('../models/product_schema')
const adminAuth = require('../middlewares/admin_auth.js')
const auth = require('../middlewares/login_auth')
const router = new express.Router()

router.post('/store/entry', auth, adminAuth, async (req,res)=>{
    const store = new Store({...req.body, owner : req.admin._id})
    try {
        await store.save()
        res.status(201).send(store)
    } catch (error) {
        res.status(400).send(error)
    }
})

//read by Id
router.get('/store/read/:id', auth, async(req,res)=>{
    const _id = req.params.id
    try {
        const store1 = await Store.find({_id, name: req.admin.name})
        res.status(200).send(store1)
    } catch (error) {
        res.status(404).send(error)
    }
})

// read All
router.get('/store/read', auth, async(req,res)=>{
    try {
        const store1 = await Store.find({ name: req.admin.name})
        res.status(200).send(store1)
    } catch (error) {
        res.status(404).send(error)
    }
})

// updating product details  by using Id
router.patch('/store/:id',auth, async(req,res)=>{
    const _id= req.params.id
    const store =req.body
    try {
        const store1 = await Store.updateOne({_id},req.body,{new: true, runValidators: true })
        const store2 = await Store.find({_id})
        res.status(200).send(store2)
    } catch (error) {
        res.status(400).send(error)
    }
})

// adding extra product to the existing array of products
router.patch('/store/insert/:id',authRole, async(req,res)=>{
    const _id= req.params.id
    const store =req.body
    try {
        const store1 = await Store.updateOne({_id},{$push:{products:[req.body]}},{new: true, runValidators: true })
        const store2 = await Store.find({_id})
        res.status(200).send(store2)
    } catch (error) {
        res.status(400).send(error)
    }
})

//updating a particular prodcut fron an existing array of products
router.patch('/store/update/:id',auth, async(req,res)=>{
    const _id= req.params.id
    const name =req.body.name
    try {
        const store1 = await Store.updateOne({_id, "products.name":name},{$set:{"products.$":req.body}},{new: true, runValidators: true })
        // const store2 = await Store.find({_id})
        res.status(200).send(store1)
    } catch (error) {
        res.status(400).send(error)
    }
})

//deleting a particular prodcut fron an existing array of products

router.patch('/store/delete/:id', auth, authRole, async(req,res)=>{
    const _id = req.params.id
    const name =req.body.name
    try {
        const Location1 = await Store.updateMany({_id,"products.name":name},{$pull:{"products":{name:name}}})
        if(!Location1){
            return res.status(404).send('product  not found')
            }
        res.status(200).send(Location1)
    } catch (error) {
        res.status(400).send(error)
    }
})


//delete By Id
router.delete('/store/delete/:id', auth, authRole, async(req,res)=>{
    const _id = req.params.id
    try {
        const Location1 = await Store.deleteOne({_id})
        if(!Location1){
            return res.status(404).send('product  not found')
            }
        res.status(200).send(Location1)
    } catch (error) {
        res.status(400).send(error)
    }
})

//delete by All
router.delete('/store/delete', auth, authRole, async(req,res)=>{

    try {
        const product1 = await Store.deleteMany({})
        if(!product1){
            return res.status(404).send('products not found')
            }
        res.status(200).send(product1)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router
Footer