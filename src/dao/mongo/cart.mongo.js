const { cartModel } = require("./model/cart.model")

class CartManagerMongo {
    
    async getCarts(){
        try{
            return await cartModel.find({})
        }catch(err){
            return new Error(err)
        }
    }
    async getCartById(cid){
        try {            
            return await cartModel.findOne({_id: cid})
        } catch (error) {
            return new Error(error)
        }

    }
    async addCart(newCart){
        try {
            
            return await cartModel.create(newCart)
        } catch (error) {
            return new Error(error)
        }
    }
   
    async addProduct(cid,pid){
        try {
            const cart = await cartModel.findOne({_id: cid})
            const product = cart.Products.find(Products =>Products.idProduct === pid);
            if(!product){
                return await cartModel.updateOne(
                    {_id: cid},
                    {$push: {Products: {idProduct:pid, quantity: 1}}}
                )

            }else{
                return await cartModel.updateOne(
                    {_id: cid, "Products.idProduct":pid},
                    {$inc: {"Products.$.quantity": 1}}
                )
            }


        } catch (error) {
            return new Error(error)
        }
    }
   
}

module.exports = new CartManagerMongo