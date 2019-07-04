const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name : String,
    address : String,
    googleId : String
    
})

mongoose.model('customers', customerSchema);