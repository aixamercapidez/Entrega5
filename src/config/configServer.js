const {connect} = require('mongoose')
let url = 'mongodb+srv://aixamercapidez:loppol123321@aixamercapidez.kzlelds.mongodb.net/ecommerce?retryWrites=true&w=majority'
module.exports = {
    connectDb: ()=>{
        connect(url)
        console.log('Base de datos conectada')
    }
}