const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title : String,
    price : Number,
    retailer : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'retailers'
    },
    brand : {
        type : String,
        default : 'Unbranded'
    },
    description: {
        type : String,
        default : ''
    },
    imgSrc : {
        type : String,
        default : ''
    },
    quantity : {
        type : String,
        default : '0'
    }
    
})

mongoose.model('products', productSchema);