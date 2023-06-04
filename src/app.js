const express = require('express')
const {connectDb} = require('./config/configServer.js')
const routerServer = require('./routes')
const logger = require('morgan')
const viewsRouter = require('./routes/views.router')
const session = require('express-session')

const { initPassport, initPassortGithub } = require('./config/passport.config.js')
const passport = require('passport')

const cookieParser = require('cookie-parser')

const app = express()
const PORT = 8080

const FileStore  = require('session-file-store')
const {create} = require('connect-mongo') 
app.use(cookieParser('P@l@braS3cr3t0'))

app.use(session({
    store: create({
        mongoUrl: 'mongodb+srv://aixamercapidez:loppol123321@aixamercapidez.kzlelds.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 1000000*6000
    }),
    secret: 'secretCoder',
    resave: false,
    saveUninitialized: false
})) 
initPassport()
initPassortGithub()
passport.use(passport.initialize())
passport.use(passport.session())
connectDb()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static',express.static(__dirname+'/public'))
app.use(logger('dev'))


app.use(routerServer)

//----------------

const { Server } = require('socket.io')




//-----------



const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})



const io = new Server(httpServer)
// hbs __________________________________________________________________
const handlebars = require('express-handlebars')

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
// hbs __________________________________________
app.use('/', viewsRouter)

const {messageModel}=require('./dao/mongo/model/message.model.js')

let chat = []

const getMessage = async ()=>{
    try{
        return await messageModel.find()
    }catch(error){
        throw new error (error)
    }
}

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')
    getMessage().then((messages)=>{
        chat = messages
        io.emit('messageLogs', chat)
    })
   

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data)
    })

    socket.on('message',async(data)=>{
        console.log(data)
        try{
            const newMessage =await messageModel.create(data)
            chat.push(newMessage)
            io.emit('messageLogs', chat)

        }catch(error){
            throw new error (error)

        }
    })
    socket.on('disconnect',()=>{
        console.log('usuario desconectado')
    })

})

app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send('Todo mal')
})
