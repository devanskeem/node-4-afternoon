const swag = require('../models/swag')

module.exports = {
    add: (req, res) => {
        const {id} = req.params
        const {user} = req.session
        let {cart} = user
        const index = cart.findIndex(swag => swag.id == id)
        if (index === -1) {
            const swagIndex = swag.findIndex(swag => swag.id == id);
            cart.push(swag[swagIndex])
            user.total += swag[swagIndex].price
        }
        res.status(200).send(user)
    },
    delete: (req, res) => {
        const {id} = req.params
        const {user} = req.session
        let {cart} = user
        const index = cart.findIndex(swag => swag.id == id)
        if (index !== -1){
            cart.splice(index, 1)
            user.total -= cart[index].price
        }
        res.status(200).send(user)
    },
    checkout: (req, res) => {
        const {user} = req.session
        user.cart = []
        user.total = 0
        res.status(200).send(user)
    }
}