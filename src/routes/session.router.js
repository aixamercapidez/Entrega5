const { Router } = require('express')
const { auth } = require('../middlewares/autenticacion.middleware')
const { userModel } = require('../dao/mongo/model/user.model')
const {createHash, isValidPassword}=require('../utils/bcryptHash')
const passport = require('passport')
const { passportAuth } = require('../config/passportAuth')
const { authorizaton } = require('../config/passportAuthorization')


const router = Router()


router.post('/login', passport.authenticate('login', {failureRedirect:'/failurelogin'}),async (req,res)=>{
    if (!req.user) return res.status(401).send({status:'error',message:'invalid credential'})
    req.session.user={
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email


    }
    res.send({status:'success',message:'user register'})
})   

router.get('/failurelogin', (req,res)=>{
    console.log("register failure")
    res.send({status:'error'})
})

router.post('/register', passport.authenticate('register', {
    failureRedirect: '/failure',
    successRedirect: '/login'
}),async (req,res) =>{
res.send({status:'succes', message:'user created'})
})

router.get('/failure', (req,res)=>{
    console.log("register failure")
    res.send({status:'error'})
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send({ status: 'error', error: err })
        }
        res.redirect('http://localhost:8080/login')
    })
})



router.get('/current', 


(req, res)=> {
    const {first_name} = req.session.user
    const {last_name} = req.session.user
    const {email} = req.session.user
   
    const {role} = req.session.user
    res.send({first_name,
        last_name,
        email,
        role})
})

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), ()=>{})
router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/views/login'}), async (req, res)=>{
    req.session.user = req.user
     res.redirect('/api/products')
 })



// sesiones 
router.get('/counter', (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`se ha visitado el sitio ${req.session.counter} veces.`)
    } else {
        req.session.counter = 1
        res.send('Bienvenido')
    }
})

router.get('/privada', auth, (req, res) => {

    res.send('Todo lo que esta acá solo lo puede ver un admin loagueado')
})

module.exports = router