const mongoose = require('mongoose');
const Product = mongoose.model('products')
module.exports = (app) => {
    app.get('/api/products',async (req,res) => {
        Product.find({}, (err,products) => {
            res.send(products)
        })
    })
}