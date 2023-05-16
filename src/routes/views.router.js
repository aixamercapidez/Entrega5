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
router.get("/realTimeProducts", async (req, res) => {
    const { payload } = await productManager.getProducts();
    const object = {
        style: "index.css",
        title: "Productos en tiempo real",
        products: payload,
    };
    res.render("realTimeProducts", object);
});

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

module.exports = router