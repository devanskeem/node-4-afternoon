require('dotenv').config()
const express = require('express')
const session = require('express-session')
const {SERVER_PORT, SESSION_SECRET} = process.env
const checkForSession = require('./middlewares/checkForSession')
const sc = require('./controllers/swag_controller')
const ac = require('./controllers/auth_controller')
const cc = require('./controllers/cart_controller')
const search_ctrl = require('./controllers/search_controller')
const app = express()

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))
app.use(checkForSession)

app.post('/api/cart/checkout', cc.checkout)
app.get('/api/swag', sc.read)
app.get('/api/user', ac.getUser)
app.post('/api/login', ac.login)
app.post('/api/register', ac.register)
app.post('/api/signout', ac.signout)
app.post('/api/cart/:id', cc.add)
app.delete('/api/cart/:id', cc.delete)
app.get('/api/search', search_ctrl.search)

app.listen(SERVER_PORT, () => console.log(`magic happening @ ${SERVER_PORT}`))