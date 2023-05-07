const {Router} =require('express')
const messageManager = require('../dao/mongo/message.mongo.js')

const router = Router()

router.get('/', async (req,res)=>{
    try {
        const message = await messageManager.getmessage()
        res.status(200).send({
            status: 'success',
            payload: message
        })
        
    } catch (error) {
        cconsole.log(error)
    }
})

router.post('/', async (request, response)=>{
    try {
        

        let result = await messageManager.addmessage()


        res.status(200).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        console.log(error)
    }
})


module.exports = router