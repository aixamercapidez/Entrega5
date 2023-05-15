const { Router } = require('express')
const CartManager = require('../dao/mongo/cart.mongo.js')

const router = Router()


router.get('/realtimeproducts', (req,res)=>{
res.render('realTimeProducts',  {})



})

router.get('/chat', (req, res)=>{
    res.render('chat', {})
})


router.get('/', (req, res)=>{

    let user = users[Math.floor( Math.random() * users.length )]

    let testUser = {
        title: 'Mercadito Fede',
        user,
        isAdmin: user.role === 'admin',
        food,
        style: 'index.css'
    }

    res.render('index', testUser)
})

router.get('/register', (req, res) => {
    res.render('registerForm', {
        style: 'index.css'
    })
})

router.post('/register', (req, res) => {
    // const {name, email, password} = req.body
    const user = req.body
    res.send({
        user,
        mensaje: 'Regístro con éxito'
    })
})

router.get("/carts/:cid", async (req, res) => {
    const { cid } = req.params;
    const cart = await CartManager.getCartById(cid)
    const cartsProducts = cart.Products
    res.render("carts", {
      
     
      payload:cart,
      cartsProducts: cartsProducts,
    })
  })

module.exports = router