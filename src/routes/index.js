const { Router } = require('express')
const {uploader} = require('../utils/multer.js')
const productRouter = require('./products.router.js')
const productCart = require('./carts.router.js')
const messageRouter = require('./message.rputer.js')


const router = Router()


// router.use('/', (req,res)=>{
//     res.send('Hola mundo')
// })
router.use('/api/productos', productRouter)
router.use('/api/carts', productCart)
router.use('/api/message', messageRouter)

router.post('/upload',  uploader.single('myFile'),(req, res)=>{
    res.send({
        status: 'successs', 
        mensaje: 'Archivo subido con éxitos'
    })
} )

module.exports = router