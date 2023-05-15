const { Router } = require('express')
const productManager = require('../dao/mongo/product.mongo.js')
const { productModel } = require('../dao/mongo/model/product.model.js')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const { page = 1 } = req.query
        const { limit = 10 } = req.query
        const {query} = req.query
      
        const { sort } = req.query
        let sortOptions
        if (sort === 'asc') {

            sortOptions = { price: 1 };

        } else if (sort === 'desc') {

            sortOptions = { price: -1 };

        }
        let products = await productModel.paginate({query}, { limit: limit, page: page, lean: true,sort: sortOptions })

        
        const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages } = products
        res.render('products', {
            status: 'success',
            products: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            totalPages
           
        })
    
    } catch (error) {
        console.log(error)
    }
})
router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        let product = await productManager.getProductById(pid)
        res.status(200).send({
            status: 'success',
            payload: product
        })
    } catch (error) {
        console.log(error)
    }
})
router.post('/', async (req, res) => {
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
router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const updateProduct = req.body

        let updated = await productManager.updateProduct(pid, updateProduct)


        res.status(200).send({
            status: 'success',
            payload: updated
        })
    } catch (error) {
        console.log(error)
    }
})
router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
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