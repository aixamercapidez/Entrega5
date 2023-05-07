const {Schema, model} = require('mongoose')

const collection = 'products'

const messageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
})

const messageModel = model(collection, messageSchema)

module.exports = {
    messageModel
}

