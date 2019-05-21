const swag = require('../models/swag')

module.exports = {
    search: (req, res) => {
        const {category} = req.query
        let filtered = swag.filter(swag => swag.category == category)
        if (filtered.length) res.status(200).send(filtered)
        else res.status(200).send(swag)
    }
}