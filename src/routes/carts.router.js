const {Router} =require('express')
const CartManager = require('../dao/mongo/cart.mongo.js')

const router = Router()

router.get('/', async (req,res)=>{
    try {
        const carts = await CartManager.getCarts()
        res.status(200).send({
            status: 'success',
            payload: carts
        })
        
    } catch (error) {
        cconsole.log(error)
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
        res.status(200).send({
            status: 'success',
            payload: cart
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/:cid/product/:pid', async (req, res)=>{
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

module.exports = router