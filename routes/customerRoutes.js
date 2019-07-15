const mongoose = require('mongoose');
const Customer = mongoose.model('customers');
const CustomerOrder = mongoose.model('customerOrders');
module.exports = (app) => {
    app.get('/api/customer', (req,res) => {
        if(!req.user) res.send(false);

        Customer.findById(req.user.id).populate('wishList').populate('cart').populate('customerOrders').exec((err,customer) => {
            if(err) res.send(err);
            res.send(customer)
        })

    })

    app.post('/api/customer', (req,res) => {
        Customer.findByIdAndUpdate(req.user.id,req.body,{new : true}, (err,customer) => {
            res.send(customer)
        })
    })

    app.post('/api/customer/wishlist',async(req,res) => {
        let found = false;
        req.user.wishList.forEach((p) => {
            if (p == req.body.id) found=true
        })
        
        if(!found) {
            await req.user.wishList.push(req.body.id)
            await req.user.save()
            res.send('Successful')
        }
        
        else {
            res.send('Already listed')
        }



    })

    app.delete('/api/customer/wishlist', async (req,res) => {
        let wishList = await req.user.wishList.filter((p) => {
            if (p == req.body.id) {
                return;
            } else {
                return p;
            }
            
        })
        await Customer.findByIdAndUpdate(req.user.id,{wishList: wishList},{new: true})
        res.send(true)
    })

    app.post('/api/customer/cart',async(req,res) => {
        let found = false;
        req.user.cart.forEach((p) => {
            if (p == req.body.id) found=true
        })
        
        if(!found) {
            await req.user.cart.push(req.body.id)
            req.user.cartQuantity.set(req.body.id,1)
            await req.user.save()
            res.send('Successful')
        }
        
        else {
            let num  = req.user.cartQuantity.get(req.body.id) +1
            req.user.cartQuantity.set(req.body.id,num)
            await req.user.save()
            res.send('Already listed')
        }



    })


    app.put('/api/customer/cart', async (req,res) => {
        let num = req.user.cartQuantity.get(req.body.id)
        if (req.body.mode === 'inc') {
            num++
        } else {
            if (num > 1) num--
        }
        req.user.cartQuantity.set(req.body.id,num)
        await req.user.save()
        res.send('Successful')
        
    })

    app.delete('/api/customer/cart', async (req,res) => {
        let cart = await req.user.cart.filter((p) => {
            if (p == req.body.id) {
                return;
            } else {
                return p;
            }
            
        })
        req.user.cartQuantity.delete(req.body.id)
        let cartQuantity = req.user.cartQuantity
        await Customer.findByIdAndUpdate(req.user.id,{cart: cart, cartQuantity: cartQuantity},{new: true})
        res.send(true)
    })

    app.get('/api/customer/order/:id',async (req,res) => {
        CustomerOrder.findById(req.params.id)
        .populate('retailers')
        .populate('products')
        .exec((err,customerOrder) => {
            res.send(customerOrder)
        })
       
    })
}


