const mongoose = require('mongoose');
const Retailer = mongoose.model('retailers');
const Product = mongoose.model('products');
const RetailerOrder = mongoose.model('retailerOrders');
const Service = mongoose.model('services')

module.exports = (app) => {
    // middlewares will be applied to app.all

    app.get('/api/retailer',async(req,res) => {
        if(!req.user) res.send(false)
        // limited population of top products 
        Retailer.findById(req.user.id)
        .populate('inventory')
        .populate('retailerOrders')
        .exec((err,user) => {
            if (err) return err;
            res.send(user);
        });
    });

    app.post('/api/retailer', async(req,res) => {
        const data = req.body;
        let options = {
            new : true
        }
        let user = await Retailer.findByIdAndUpdate(req.user.id, data, options)
        .populate('inventory').exec((err,user) => {
            if (err) return err;
            res.send(user);
        });
    })

    app.get('/api/retailer/inventory', async(req,res) => {
        // more products are given
        let user = await req.user.populate('inventory');
        res.send(user.inventory);
    });

    app.post('/api/retailer/inventory', async (req,res) => {
        // adding a new product to inventory
        let data = req.body;
        data.retailer = req.user.id;
        let product = await new Product(data).save();
        await req.user.inventory.push(product.id)
        await req.user.save();
        res.send(product);
    });

    app.put('/api/retailer/inventory', async(req,res) => {
        // editiing an existing product 
        let data = req.body;
        const {title, price, brand, description, imgSrc,quantity} = data
        let newData = {
            title,
            price,
            brand,
            description,
            imgSrc,
            quantity    
        }
        await Product.findByIdAndUpdate(data.id, newData);
        let updatedProduct = await Product.findById(data.id);
        res.send(updatedProduct) ;

    })

    app.delete('/api/retailer/inventory', async(req,res) => {
        await Product.findByIdAndDelete(req.body.id);
        await req.user.inventory.filter(p => {
            if (p == req.body.id) {
                return ;
            }
            else {
                return p
            }
        })
        await req.user.save();
        res.send('User deleted');
    })

    
    app.get('/api/retailer/order/:id',async (req,res) => {
        let order = await RetailerOrder.findById(req.params.id).populate('products').populate('serviceId')
        let services = await Service.find({})
        let response = {
            order,
            services
        }
        res.send(response) 
    })

    app.put('/api/retailer/order/:id', async(req,res) => {
        let service = await Service.findById(req.body.serviceId)
        let serviceRetailerOrders = service.retailerOrders;
        serviceRetailerOrders.push(req.params.id)
        let updatedService = await Service.findByIdAndUpdate(req.body.serviceId,{retailerOrders : serviceRetailerOrders}, {new : true})

        if(updatedService){
            let updatedOrder = await RetailerOrder.findByIdAndUpdate(req.params.id,{serviceId :  req.body.serviceId, status : 'Pending'},{new : true})
            let response = await RetailerOrder.findById(updatedOrder.id).populate('products').populate('serviceId')
            res.send(response)
        } 
    })
}