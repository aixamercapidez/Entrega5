const { Router } = require('express')
const { CartManager } = require('../CartManager/CartManager')

const router = Router()
const carts = new CartManager();


router.post('/', async (request, response)=>{
    try{
        
        const cart = await carts.addCart()
        response.status(200).send({status: "success"})

    }catch(error){
        response.status(500).send({error})
    }
})


router.get('/:cid', async (request, response)=>{
    try{
        const id =Number( request.params.cid)
        const getcartbyid = await carts.getcartById(id)
        if (getcartbyid == 'Not found') return response.status(400).send({error:"Product not found"})
        response.status(200).send(getcartbyid)
    }
    catch(error){
        response.status(500).send({error})
    }
})

router.post('/:cid/product/:pid', async (request, response)=>{
    try{
        const cid =Number( request.params.cid)
        const pid =Number( request.params.pid)
        const cart = await carts.addProduct(cid,pid)
        response.status(200).send({status: "success", payload : {cart}})

    }catch(error){
        response.status(500).send({error})
    }
})

module.exports = router