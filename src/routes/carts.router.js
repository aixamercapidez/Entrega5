const {Router} =require('express')
const CartManager = require('../dao/mongo/cart.mongo.js')
const { cartModel } = require("../dao/mongo/model/cart.model.js")
const router = Router()

router.get('/', async (req,res)=>{
    try {
        const carts = await CartManager.getCarts()
        res.status(200).send({
            status: 'success',
            payload: carts
        })
        



    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (request, response)=>{
    try {
        

        let result = await CartManager.addCart()


        res.status(200).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        console.log(error)
    }
})



router.get('/:cid', async (req,res)=>{
    try {
        const {cid} = req.params
        let cart = await CartManager.getCartById(cid)
        res.render('carts',{
            status: 'success',
            payload: cart,
            carts:cart
        })
    } catch (error) {
        console.log(error)
    }
})




router.post('/:cid/products/:pid', async (req, res)=>{
    try{
        const {cid} = req.params
        const {pid} = req.params
        
        const cart = await CartManager.addProduct(cid,pid)
        res.status(200).send({
            status: 'success',
            payload: cart
        })

    }catch(error){
        console.log(error)
    }
})

router.delete('/:cid/product/:pid', async (req, res)=>{
    try{
        const {cid} = req.params
        const {pid} = req.params
        
        const cart = await CartManager.deleteProduct(cid,pid)
        res.status(200).send({
            status: 'success',
            payload: cart
        })

    }catch(error){
        console.log(error)
    }
})

router.delete('/:cid', async (req, res)=>{
    try{
        const {cid} = req.params
    
        const cartdeleted = await CartManager.deleteCart(cid)
        res.status(200).send({
            status: 'success',
            payload: cartdeleted
        })

    }catch(error){
        console.log(error)
    }
})

router.put('/:cid', async (req, res)=>{
    try{
        const {cid} = req.params
        const {updatecart} = req.body
        const cart = await CartManager.updateCart(cid,updatecart)
        res.status(200).send({
            status: 'success',
            payload: cart
        })

    }catch(error){
        console.log(error)
    }
})

router.put('/:cid/product/:pid', async (req, res)=>{
    try{
        const {cid} = req.params
        const {pid} = req.params
        const {quantity} = req.body
        const cart = await CartManager.Updatequantity(cid,pid,quantity)
        res.status(200).send({
            status: 'success',
            payload: cart
        })

    }catch(error){
        console.log(error)
    }
})

module.exports = router