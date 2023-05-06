const {Router} =require('express')
const productManager = require('../dao/mongo/product.mongo.js')

const router =  Router()

router.get('/', async (req,res)=>{
    try {
        const products = await productManager.getProducts()
        res.status(200).send({
            status: 'success',
            payload: products
        })
        
    } catch (error) {
        cconsole.log(error)
    }
})
router.get('/:pid', async (req,res)=>{
    try {
        const {pid} = req.params
        let product = await productManager.getProductById(pid)
        res.status(200).send({
            status: 'success',
            payload: product
        })
    } catch (error) {
        console.log(error)
    }
})
router.post('/', async (req,res)=>{
    try {
        const newProduct = req.body

        let result = await productManager.addProduct(newProduct)


        res.status(200).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        console.log(error)
    }
})
router.put('/:pid', async(req,res)=>{
    try {
        const {pid} = req.params
        const updateProduct = req.body

        let updated = await productManager.updateProduct(pid,updateProduct)


        res.status(200).send({
            status: 'success',
            payload: updated
        })
    } catch (error) {
        console.log(error)
    }
})
router.delete('/:pid',async (req,res)=>{
    try {
        const {pid} = req.params
        let product = await productManager.deleteProduct(pid)
        res.status(200).send({
            status: 'success',
            payload: product
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router