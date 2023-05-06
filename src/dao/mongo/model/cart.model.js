const {Schema, model} = require('mongoose')

const collection = 'carts'

const cartSchema = new Schema({
    Products: {
        type: Array,
        required: true
    },
   
    
})

const cartModel = model(collection, cartSchema)

module.exports = {
    cartModel
}

