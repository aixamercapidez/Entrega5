const { Router } = require('express')
const { auth } = require('../middlewares/autenticacion.middleware')
const { userModel } = require('../dao/mongo/model/user.model')

const router = Router()


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    // validar email y password

    // vamos a tener una función para validar el password
    const userDB = await userModel.findOne({ email, password })

    if (!userDB) return res.send({ status: 'error', message: 'No existe ese usuario, revisar' })
    let role
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        role = "admin"
    } else {
        role = "user"
    }
    req.session.user = {
        first_name: userDB.first_name,
        last_name: userDB.last_name,
        email: userDB.email,
       role: role,
    }

    //  res.send({
    //      status: 'success',
    //     message: 'login success',
    //      session: req.session.user
    //  })
    res.redirect('http://localhost:8080/api/products')
})


router.post('/register', async (req, res) => {
    try {
        const { username, first_name, last_name, email, password } = req.body
        //validar si vienen distintos de vacios && caracteres especiales

        // validar si existe mail+
        const existUser = await userModel.findOne({ email })

        if (existUser) return res.send({ status: 'error', message: 'el email ya está registrado' })

        // otra forma
        // const newUser = new userModel({
        //     username,
        //     first_name,
        //     last_name, 
        //     email, 
        //     password 
        // })
        // await newUser.save()
     
   
        const newUser = {
            username,
            first_name,
            last_name,
            email,
            password,
            
        }
        let resultUser = await userModel.create(newUser)




        res.redirect('http://localhost:8080/login')
    } catch (error) {
        console.log(error)
    }

})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send({ status: 'error', error: err })
        }
        res.redirect('http://localhost:8080/login')
    })
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