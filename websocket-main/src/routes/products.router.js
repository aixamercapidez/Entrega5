const { Router } = require('express')
const { ProductManager } = require('../ProductManager/ProductManager')

const router = Router()
const products = new ProductManager();



router.get('/', async (request, response)=>{
    try{
    let limit = request.query.limit
    const getproducts = await products.getProducts()
    if(limit == null){
        response.status(200).send(getproducts)
    }else{
        response.status(200).send(getproducts.slice(0,limit))
    }
    
    }
    catch (error){
        response.status(500).send({error:"Product not found"})
    }
})

router.get('/:pid', async (request, response)=>{
    try{
        const id =Number( request.params.pid)
        const getproductsbyid = await products.getProductById(id)
        if (getproductsbyid == 'Not found') return response.status(400).send({error:"Product not found"})
        response.status(200).send(getproductsbyid)
    }
    catch(error){
        response.status(500).send({error:"Product not found"})
    }
})

router.post('/', async (request, response)=>{
    try{
        const newproduct = request.body
        const product = await products.addProduct(newproduct)
        if(!newproduct.title || !newproduct.description || !newproduct.price || !newproduct.code || !newproduct.stock || !newproduct.category){ 
            return response.status(400).send({status:'error', mensaje: 'All fields are required (except thumbnail)'})
        }
       if (product === 1){
        return response.status(400).send({status:'error', mensaje: 'Duplicated Code'})
    }
       
        else{
        response.status(201).send({status:'success', payload: product})}

    }catch(error){
        response.status(500).send({error})
    }
})

router.put('/:pid', async (request, response)=>{
    try{
        const id =Number(request.params.pid)
        const updateproduct = request.body
        const product = await products.updateProduct(id,updateproduct)
        response.status(200).send({status: "success", payload : product})
    }
    catch(error){
        response.status(500).send({error})
    }

})


router.delete('/:pid', async (request, response)=>{
    
        const id =Number( request.params.pid)
        const deleteproductsbyid = await products.deleteProduct(id)
        if (deleteproductsbyid === 1) {return response.send({error:"Product not found"})}
        else{
        response.status(200).send({status: 'success'})}
   
   

})

module.exports = router