const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const { ProductManager } = require('./ProductManager/ProductManager')
const productRouter = require('./routes/products.router')
const cartRouter = require('./routes/carts.router')
const viewRouter = require('./routes/views.router')

//hbs ______________________________________________________________

const {Server} = require('socket.io')
//const { socketProduct } = require('./utils/socketProduct')

const httpServer = app.listen(8080, ()=>{
    console.log('Escuchando en el puerto 8080')
})
// app.use(express.static(__dirname+'/public'))

const io = new Server(httpServer)


const productos = new ProductManager();



const socketProduct = async (io) => {
    const products = await productos.getProducts()
    io.on('connection', socket => {

        console.log('cliente conectado')
     
        socket.emit('productos',products )
    })
}

socketProduct(io)


app.engine('handlebars', handlebars.engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.get('/',async (req,res) =>{
    const getproducts = await productos.getProducts()
let producs={
   getproducts
}
    res.render('home',producs)
})

//hbs ______________________________________________________________

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));


app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter)
app.use('/',viewRouter)

