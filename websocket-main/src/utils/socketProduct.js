const { ProductManager } = require('../ProductManager/ProductManager')

const productManager = new ProductManager()

const socketProduct = async (io) => {
    const products = await productManager.getProducts()
    io.on('connection', socket => {

        console.log('cliente conectado')
     
        socket.emit('productos',products )
    })
}

module.exports = {
    socketProduct
}